import React, { useState } from 'react';
import { BaseModal } from '../../BaseModal';
import { MdPersonAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaUserAlt, FaTrash, FaLock, FaEyeSlash, FaEye, FaCalendarAlt } from 'react-icons/fa';
import './style.scss';
import { InputBase } from '../../Input';
import { format, fromUnixTime, getUnixTime, parseISO } from 'date-fns';
import { CustomLoading } from '../../CustomLoading';
import { ConfirmComponent } from '../../ConfirmComponent';

import { IoMaleFemale } from "react-icons/io5";
import { FiMail } from 'react-icons/fi';
import { BsFillTelephoneFill } from 'react-icons/bs';

const moment = require("moment");

export default function ModalFornecedores({
  open,
  type,
  toggleModal,
  data,
  handleSubmit,
  loading,
}) {
  
  const [dataUser, setDataUser] = useState(data);
  const [confirmModal, setConfirmModal] = useState(false);

  // console.log(dataUser)

  let title = '';
  let icon = null;
  let buttonTitle = '';

  if (type === 'create') {
    title = 'Criar Fornecedor';
    icon = MdPersonAdd;
    buttonTitle = 'Criar';
  }
  if (type === 'edit') {
    title = 'Editar Fornecedor';
    icon = MdEdit;
    buttonTitle = 'Editar';
  }
  if (type === 'delete') {
    title = 'Excluir Fornecedor';
    icon = MdDelete;
    buttonTitle = 'Excluir';
  }

 
  const handleChange = (e) => {
    const { name, value } = e.target;
      setDataUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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
                name='fornecedor'
                value={dataUser.fornecedor}
                label='Fornecedor'
                required
                type='text'
                handleChange={handleChange}
              />
              <InputBase
                disabled={type === 'delete'}
                icon={FiMail}
                name='email'
                value={dataUser.email}
                label='Email'
                required
                type='email'
                handleChange={handleChange}
              />
              <InputBase
                icon={BsFillTelephoneFill}
                disabled={type === 'delete'}
                value={dataUser.telefone}
                name='telefone'
                label='Telefone'
                required
                type='tel'
                mask="(99)99999-9999"
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
          title='Deletar Fornecedor'
          icon={FaTrash}
          confirmFunction={() =>
            handleSubmit({
              ...dataUser,
            })
          }
        >
          Tem certeza que deseja excluir {dataUser.nome}?
        </ConfirmComponent>
      )}
    </>
  );
}
