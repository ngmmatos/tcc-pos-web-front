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
  const [stateBarbeiro, setStateBarbeiro] = useState(false);
  const [statedAdm, setStateAdm] = useState(false);
  const [aniversario, setAniversario] = useState(
    dataUser && dataUser.data_nascimento
      ? formatDate(dataUser.data_nascimento)
      : ''
  );

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


  const enableBarbeiro = () => {
      let alteraBarbeiro = dataUser
      if (alteraBarbeiro.barbeiro) {
        alteraBarbeiro.barbeiro = false
        setDataUser(alteraBarbeiro)
      } else {
      alteraBarbeiro.barbeiro = true
      setDataUser(alteraBarbeiro)
    }
  }

  const enableAdm = () => {
    let alteraAdm = dataUser
    if (alteraAdm.adm) {
      alteraAdm.adm = false
      setDataUser(alteraAdm)
    } else {
      alteraAdm.adm = true
      setDataUser(alteraAdm)
    }
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'adm') {
      let alteraAdm = dataUser
      if (alteraAdm.adm) {
        alteraAdm.adm = false
        setDataUser(alteraAdm)
      } else {
        alteraAdm.adm = true
        setDataUser(alteraAdm)
      }
    } else if (name === 'barbeiro') {
      let alteraBarbeiro = dataUser
      if (alteraBarbeiro.barbeiro) {
        alteraBarbeiro.barbeiro = false
        setDataUser(alteraBarbeiro)
      } else {
      alteraBarbeiro.barbeiro = true
      setDataUser(alteraBarbeiro)
      }
    } else if (name === 'sexo') {
      let alteraSexo = dataUser
      alteraSexo.sexo = value
      setDataUser(alteraSexo)
    }
    else if (name === 'data_nascimento') {
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
                icon={FiMail}
                name='email'
                value={dataUser.email}
                label='Email'
                required
                type='email'
                handleChange={handleChange}
              />
              <div className="inputBase-root2">
                <IoMaleFemale />
                  <div>
                      <label htmlFor="sexo">Sexo</label>
                      <select onChange={handleChange} required name="sexo"> 
                          <option value="">Selecione</option>
                          <option value="M">Masculino</option>
                          <option value="F">Feminino</option>
                      </select>
                  </div>
              </div>
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
              <InputBase
                icon={FaCalendarAlt}
                disabled={type === 'delete'}
                name='data_nascimento'
                max={moment().format("YYYY-MM-DD")}
                min={`${(moment().format("YYYY")-120)}-${moment().format("MM-DD")}`}
                value={aniversario}
                label='Aniversário'
                required
                type='date'
                handleChange={handleChange}
              />
              <InputBase
                icon={FaLock}
                disabled={type !== 'create'}
                name='senha'
                value={dataUser.senha}
                label='Senha'
                required
                type='password'
                handleChange={handleChange}
              />
              <div className="barbAdmButton">    
                <p>Barbeiro</p>
                <label className="switchButton">
                    {/* <input type="checkbox" onChange={handleChange} name="barbeiro"/> */}
                    {dataUser.barbeiro ?
                    <input type="checkbox" onChange={enableBarbeiro} name="barbeiro" defaultChecked/>
                    :
                    <input type="checkbox" onChange={enableBarbeiro} name="barbeiro" />
                }
                    {/* <span className="slider round"></span> */}
                </label>
              </div> 
              <div className="barbAdmButton">    
                <p>Administrador</p>
                <label className="switchButton">
                    {/* <input type="checkbox" onChange={handleChange} name="adm"/> */}
                    {dataUser.adm ?
                    <input type="checkbox" onChange={enableAdm} name="adm" defaultChecked/>
                    :
                    <input type="checkbox" onChange={enableAdm} name="adm" />
                }
                    {/* <span className="slider round"></span> */}
                </label>
              </div> 
            </div>
            <div className='btn-group'>
              <button
                className='btn btn-primary'
                onClick={() =>
                  (type == 'delete'
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
