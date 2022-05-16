import React, { useState } from 'react';
import { BaseModal } from '../../BaseModal';
import { MdPersonAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaUserAlt, FaTrash } from 'react-icons/fa';
import './style.scss';
import { InputBase } from '../../Input';
import { format, fromUnixTime, getUnixTime, parseISO } from 'date-fns';
import { CustomLoading } from '../../CustomLoading';
import { ConfirmComponent } from '../../ConfirmComponent';

export default function ModalUsuarios({
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
  const [aniversario, setAniversario] = useState(
    dataUser && dataUser.data_nascimento
      ? formatDate(dataUser.data_nascimento)
      : ''
  );
  console.log(dataUser);

  let title = '';
  let icon = null;
  let buttonTitle = '';

  if (type === 'create') {
    title = 'Criar Usuário';
    icon = MdPersonAdd;
    buttonTitle = 'Criar';
  }
  if (type === 'edit') {
    title = 'Editar Usuário';
    icon = MdEdit;
    buttonTitle = 'Editar';
  }
  if (type === 'delete') {
    title = 'Excluir Usuário';
    icon = MdDelete;
    buttonTitle = 'Excluir';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'data_nascimento') {
      setAniversario(value);
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
                name='nome'
                value={dataUser.nome}
                label='Nome Completo'
                required
                type='text'
                handleChange={handleChange}
              />
              <InputBase
                disabled={type === 'delete'}
                icon={FaUserAlt}
                name='email'
                value={dataUser.email}
                label='Email'
                required
                type='email'
                handleChange={handleChange}
              />

              <InputBase
                icon={FaUserAlt}
                disabled={type === 'delete'}
                required
                name='sexo'
                value={dataUser.sexo}
                label='Sexo'
                type='text'
                handleChange={handleChange}
              />
              <InputBase
                icon={FaUserAlt}
                disabled={type === 'delete'}
                value={dataUser.telefone}
                name='telefone'
                label='Telefone'
                required
                type='tel'
                handleChange={handleChange}
              />
              <InputBase
                icon={FaUserAlt}
                disabled={type === 'delete'}
                name='data_nascimento'
                value={aniversario}
                label='Aniversário'
                required
                type='date'
                handleChange={handleChange}
              />
            </div>
            <div className='btn-group'>
              <button
                className='btn btn-primary'
                onClick={() =>
                  (type = 'delete'
                    ? handleConfirmDelete()
                    : handleSubmit({
                        ...dataUser,
                        data_nascimento: getUnixTime(parseISO(aniversario)),
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
              data_nascimento: getUnixTime(parseISO(aniversario)),
            })
          }
        >
          Tem certeza que deseja excluir {dataUser.nome}?
        </ConfirmComponent>
      )}
    </>
  );
}
