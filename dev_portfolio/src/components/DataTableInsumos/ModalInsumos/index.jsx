import React, { useState, useEffect } from 'react';
import { BaseModal } from '../../BaseModal';
import { api } from '../../../services/api';
import { MdPersonAdd, MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineBarChart } from "react-icons/ai";
import { FaUserAlt, FaTrash } from 'react-icons/fa';
import './style.scss';
import { InputBase } from '../../Input';
import { MdPriceChange } from "react-icons/md";
import { CustomLoading } from '../../CustomLoading';
import { ConfirmComponent } from '../../ConfirmComponent';
import { useProcedures } from '../../../hooks/useProcedures';

const moment = require("moment");


export default function ModalInsumos({
  open,
  type,
  toggleModal,
  data,
  handleSubmit,
  loading,
}) {
  
  
  const [dataUser, setDataUser] = useState(data);
  const [confirmModal, setConfirmModal] = useState(false);
  const [ fornecedoresList, setFornecedoresList ] = useState([]);
  const [ fornecedorId, setFornecedorId ] = useState('');

  async function getFornecedoresList() {
    const { data } = await api.get('/fornecedor');
    setFornecedoresList(data);
  }

  useEffect(() => {
    getFornecedoresList([])
  }, []);

  let title = '';
  let icon = null;
  let buttonTitle = '';

  if (type === 'create') {
    title = 'Criar Insumo';
    icon = MdPersonAdd;
    buttonTitle = 'Criar';
  }
  if (type === 'edit') {
    title = 'Editar Insumo';
    icon = MdEdit;
    buttonTitle = 'Editar';
  }
  if (type === 'delete') {
    title = 'Excluir Insumo';
    icon = MdDelete;
    buttonTitle = 'Excluir';
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id_fornecedor') {
      dataUser.id_fornecedor = parseInt(value)
      setDataUser(dataUser)
    } else {
      setDataUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  //   const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'id_fornecedor') {
  //     dataUser.id_fornecedor = parseInt(value)
  //     setDataUser(dataUser)
  //   } else if (name === 'estoque') {
  //     dataUser.estoque = parseInt(value)
  //     setDataUser(dataUser)
  //   } else {
  //     setDataUser((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

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
              <InputBase
                disabled={type === 'delete'}
                icon={FaUserAlt}
                name='insumo'
                value={dataUser.insumo}
                label='Insumo'
                required
                type='text'
                handleChange={handleChange}
              />
              <div className="escolheFornecedor">
                <FaUserAlt/>
                  <div>
                    <label htmlFor="fornecedorList">Fornecedor</label>
                    {/* <select onChange={({ target }) => setFornecedorId(target.value)} required name="fornecedor"> */}
                    <select onChange={handleChange} required name="id_fornecedor">
                      <option value="">Selecione um fornecedor</option>
                      {fornecedoresList && fornecedoresList.map(forn =>
                          <option key={forn.id_fornecedor} value={forn.id_fornecedor}>{forn.fornecedor}</option>
                      )}
                    </select>
                  </div>  
               </div>
              <InputBase
                disabled={type === 'delete'}
                icon={AiOutlineBarChart}
                name='estoque'
                value={dataUser.estoque}
                label='Estoque'
                required
                type='number'
                handleChange={handleChange}
              />
              <InputBase
                disabled={type === 'delete'}
                icon={MdPriceChange}
                name='ultimo_valor'
                value={dataUser.ultimo_valor}
                label='Último Valor'
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
          title='Deletar Cliente'
          icon={FaTrash}
          confirmFunction={() =>
            handleSubmit({
              ...dataUser,
            })
          }
        >
          Tem certeza que deseja excluir {dataUser.insumo}?
        </ConfirmComponent>
      )}
    </>
  );
}
