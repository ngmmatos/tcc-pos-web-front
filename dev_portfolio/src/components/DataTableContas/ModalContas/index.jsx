import React, { useState } from 'react';
import { BaseModal } from '../../BaseModal';
import { MdPersonAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaUserAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import './style.scss';
import { InputBase } from '../../Input';
import { format, fromUnixTime, getUnixTime, parseISO } from 'date-fns';
import { CustomLoading } from '../../CustomLoading';
import { ConfirmComponent } from '../../ConfirmComponent';

import { MdPriceChange } from "react-icons/md";

const moment = require("moment");

export default function ModalContas({
  open,
  type,
  toggleModal,
  data,
  handleSubmit,
  loading,
}) {
  const formatDate = (date) => {
    return format(fromUnixTime(date), 'yyyy-MM-dd');
  };


  const [dataUser, setDataUser] = useState(data);
  const [confirmModal, setConfirmModal] = useState(false);
  const [vencimento, setVencimento] = useState(
    dataUser && dataUser.dt_vencimento
      ? formatDate(dataUser.dt_vencimento)
      : ''
  );
  const [pagamento, setPagamento] = useState(
    dataUser && dataUser.dt_pagamento
      ? formatDate(dataUser.dt_pagamento)
      : ''
  );

  console.log(dataUser)

  let title = '';
  let icon = null;
  let buttonTitle = '';

  if (type === 'create') {
    title = 'Criar Conta';
    icon = MdPersonAdd;
    buttonTitle = 'Criar';
  }
  if (type === 'edit') {
    title = 'Editar Conta';
    icon = MdEdit;
    buttonTitle = 'Editar';
  }
  if (type === 'delete') {
    title = 'Excluir Conta';
    icon = MdDelete;
    buttonTitle = 'Excluir';
  }

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dt_vencimento') {
      setVencimento(value);
    } else if (name === 'dt_pagamento') {
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
              <InputBase
                disabled={type === 'delete'}
                icon={FaUserAlt}
                name='descricao'
                value={dataUser.descricao}
                label='Descricao'
                required
                type='text'
                handleChange={handleChange}
              />
              <InputBase
                disabled={type === 'delete'}
                icon={MdPriceChange}
                name='valor'
                value={dataUser.valor}
                label='Valor'
                required
                type='text'
                handleChange={handleChange}
              />
              <InputBase
                icon={FaCalendarAlt}
                disabled={type === 'delete'}
                name='dt_vencimento'
                value={vencimento}
                label='Vencimento'
                required
                type='date'
                handleChange={handleChange}
              />
              <InputBase
                icon={FaCalendarAlt}
                disabled
                name='dt_pagamento'
                value={pagamento}
                label='Pagamento'
                required
                type='date'
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
                        dt_vencimento: getUnixTime(parseISO(vencimento)),
                        pagamento: getUnixTime(parseISO(pagamento)),
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
              dt_vencimento: getUnixTime(parseISO(vencimento)),
              pagamento: getUnixTime(parseISO(pagamento)),
            })
          }
        >
          Tem certeza que deseja excluir {dataUser.descricao}?
        </ConfirmComponent>
      )}
    </>
  );
}
