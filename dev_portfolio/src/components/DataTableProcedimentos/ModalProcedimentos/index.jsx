import React, { useState } from 'react';
import { BaseModal } from '../../BaseModal';
import { MdPersonAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaUserAlt, FaTrash, FaLock} from 'react-icons/fa';
import './style.scss';
import { InputBase } from '../../Input';
import { CustomLoading } from '../../CustomLoading';
import { ConfirmComponent } from '../../ConfirmComponent';
import { AiOutlineFieldTime, AiOutlineFileText, AiOutlineScissor } from "react-icons/ai";
import { MdPriceChange } from "react-icons/md";

const moment = require("moment");

export default function ModalProcedimentos({
  open,
  type,
  toggleModal,
  data,
  handleSubmit,
  loading,
}) {

  const [dataUser, setDataUser] = useState(data);
  const [confirmModal, setConfirmModal] = useState(false);
  const [stateBarbeiro, setStateBarbeiro] = useState(false);
  const [statedAdm, setStateAdm] = useState(false);

  let title = '';
  let icon = null;
  let buttonTitle = '';

  if (type === 'create') {
    title = 'Criar Procedimento';
    icon = MdPersonAdd;
    buttonTitle = 'Criar';
  }
  if (type === 'edit') {
    title = 'Editar Procedimento';
    icon = MdEdit;
    buttonTitle = 'Editar';
  }
  if (type === 'delete') {
    title = 'Excluir Procedimento';
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
                icon={AiOutlineScissor}
                name='procedimento'
                value={dataUser.procedimento}
                label='Procedimento'
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
                disabled={type === 'delete'}
                icon={AiOutlineFieldTime}
                name='tempo_medio'
                value={dataUser.tempo_medio}
                label='Tempo Médio'
                required
                type='number'
                handleChange={handleChange}
              />
              <InputBase
                icon={AiOutlineFileText}
                disabled={type === 'delete'}
                name='descricao'
                value={dataUser.descricao}
                label='Descrição'
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
          Tem certeza que deseja excluir {dataUser.procedimento}?
        </ConfirmComponent>
      )}
    </>
  );
}
