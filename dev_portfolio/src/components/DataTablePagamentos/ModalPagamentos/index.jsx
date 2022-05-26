import React, { useState, useEffect } from 'react';
import { BaseModal } from '../../BaseModal';
import { api } from '../../../services/api';
import { MdPersonAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaUserAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { format, fromUnixTime, getUnixTime, parseISO} from 'date-fns';
import { BiNote } from "react-icons/bi";
import Cookies from 'universal-cookie';
import './style.scss';
import { InputBase } from '../../Input';
import { MdPriceChange } from "react-icons/md";
import { CustomLoading } from '../../CustomLoading';
import { ConfirmComponent } from '../../ConfirmComponent';


const moment = require("moment");


export default function ModalPagamentos({
  open,
  type,
  toggleModal,
  data,
  handleSubmit,
  loading,
}) {

  const formatDate = (date) => {
    return format(fromUnixTime(date), 'dd/MM/yyyy');
  };
  
  const [dataUser, setDataUser] = useState(data);
  const [confirmModal, setConfirmModal] = useState(false);
  const [ contaList, setContaList ] = useState([]);
  const [ contaId, setContaId ] = useState('');
  const [pagamento, setPagamento] = useState(
    dataUser && dataUser.data_pagamento
      ? formatDate(dataUser.data_pagamento)
      : ''
  );

  console.log(dataUser)

  async function getContaList() {
    const { data } = await api.get('/conta?dt_pagamento=0');
    setContaList(data);
  }

  const getAdmin = () => {

    const isAdmin = cookieLoaded.roles[0].admin

    dataUser.id_adm = isAdmin
    setDataUser(dataUser)
  }

  useEffect(() => {
    getContaList([])
    getAdmin([])
  }, []);

  let title = '';
  let icon = null;
  let buttonTitle = '';

  if (type === 'create') {
    title = 'Criar Pagamento';
    icon = MdPersonAdd;
    buttonTitle = 'Criar';
  }
  if (type === 'edit') {
    title = 'Editar Pagamento';
    icon = MdEdit;
    buttonTitle = 'Editar';
  }
  if (type === 'delete') {
    title = 'Excluir Pagamento';
    icon = MdDelete;
    buttonTitle = 'Excluir';
  }
 
  const cookies = new Cookies();
  const cookieLoaded = cookies.get('barbearia');


  const handleChange = (e) => {


    const { name, value } = e.target;
    if (name === 'id_conta') {
      dataUser.id_conta = parseInt(value.split(',')[0]);
      dataUser.valor = value.split(',')[1]
      setDataUser(dataUser);
    } else if (name === 'data_pagamento') {
      setPagamento(value);
    } else {
      setDataUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleConfirmDelete = () => {
    setConfirmModal(true);
  };

  return (
    <>
      <BaseModal
        title={title}
        openModal={open}
        toggleModal={toggleModal}
        icon={icon}
      >
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <div className='modal-section'>
              <div className="escolheConta">
                <FaUserAlt/>
                  <div>
                    <label htmlFor="fornecedorConta">Conta</label>
                    <select onChange={handleChange} required name="id_conta" disabled={type === 'delete'}>
                      <option value="">Selecione uma conta</option>
                      {contaList && contaList.map(conta =>
                          <option key={conta.id_conta} value={[conta.id_conta, conta.valor]}>{`${conta.descricao} - ${formatDate(conta.dt_vencimento)}`}</option>
                      )}
                    </select>
                  </div>  
               </div>
               <InputBase
                icon={FaCalendarAlt}
                disabled={type === 'delete'}
                name='data_pagamento'
                max={moment().format("YYYY-MM-DD")}
                min={`${(moment().format("YYYY")-120)}-${moment().format("MM-DD")}`}
                value={pagamento}
                label='Pagamento'
                required
                type='date'
                handleChange={handleChange}
              />
              <InputBase
                disabled={type === 'delete'}
                icon={MdPriceChange}
                name='valor'
                value={dataUser.valor}
                label='Valor'
                required
                type='value'
                handleChange={handleChange}
              />
              <InputBase
                disabled={type === 'delete'}
                icon={BiNote}
                name='observacao'
                value={dataUser.observacao}
                label='Observacao'
                required
                type='text'
                handleChange={handleChange}
              />
            </div>
            <div className='btn-group'>
              <button
                className='btn btn-primary'
                onClick={() =>
                  (type == 'delete'
                    ? handleConfirmDelete()
                    : handleSubmit({
                        ...dataUser,
                        data_pagamento: getUnixTime(parseISO(pagamento)),
                      }))
                }
              >
                {buttonTitle}
              </button>
              <button className='btn btn-primary' onClick={toggleModal}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </BaseModal>

      {confirmModal && (
        <ConfirmComponent
          loading={loading}
          open={confirmModal}
          toggleModal={toggleModal}
          title='Deletar Pagamento'
          icon={FaTrash}
          confirmFunction={() =>
            handleSubmit({
              ...dataUser,
              data_pagamento: getUnixTime(parseISO(pagamento)),
            })
          }
        >
          Tem certeza que deseja excluir pagamento?
        </ConfirmComponent>
      )}
    </>
  );
}
