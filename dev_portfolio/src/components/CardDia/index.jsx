import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

import { FaTrash } from 'react-icons/fa';
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from 'react-icons/bs';
import './style.scss';

import ModalAdicionaHora from './ModalAdicionaHora/ModalAdicionaHora';

import { ConfirmRemove } from './../ConfirmRemove/index';
import { DataTableComponent } from '../DataTableComponent';
import { CustomLoading } from './../CustomLoading/index';
const moment = require('moment');

export default function CardDiaBarbeiro({ daySelect }) {
  const { userSigned } = useAuth();
  const [agendaDia, setAgendaDia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [sortOrderHour, setSortOrderHour] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [buttonRemove, setButtonRemove] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({ isOpen: false, id: null });
  const getIdBarbeiro = userSigned.roles.find((item) => item.barbeiro);
  const convertIdBarbeiro = getIdBarbeiro.barbeiro;
  const firstHours = moment(daySelect).unix();
  const lastHours = moment(daySelect).hours(23).unix();
  const formatDate = moment(daySelect).format('DD/MM');
  let Icon = sortOrderHour ? BsArrowDownCircleFill : BsArrowUpCircleFill;

  const getSchedulerBarber = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/agenda', {
        params: {
          id_barbeiro: convertIdBarbeiro,
          hr_inicio: firstHours,
          hr_fim: lastHours,
        },
      });
      const setCheckBox = data.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });

      setAgendaDia(setCheckBox);
    } catch (e) {
      console.log(e);
      setAgendaDia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchedulerBarber();
  }, [firstHours, convertIdBarbeiro, lastHours]);

  const handleSort = () => {
    setSortOrderHour(!sortOrderHour);
    if (sortOrderHour) {
      setAgendaDia(agendaDia.sort((a, b) => a.hr_inicio - b.hr_inicio));
    } else {
      setAgendaDia(agendaDia.sort((a, b) => b.hr_inicio - a.hr_inicio));
    }
  };

  const handleDeleteAllHours = () => {
    setDeleteAll(true);
    const ids = agendaDia
      .filter((item) => item.checked)
      .map((item) => item.id_agenda);
    setModalConfirm({ isOpen: true, id: ids });
  };

  const handleDeleteHour = (id) => {
    setModalConfirm({ id: id, isOpen: true });
  };

  const toggleConfirmModal = () => {
    setModalConfirm({ id: null, isOpen: false });
    getSchedulerBarber();
    setDeleteAll(false);
  };

  const toggleModal = () => {
    setModal(!modal);
    getSchedulerBarber();
  };

  const handleSelectAll = () => {
    const changeChecked = agendaDia.map((item) => {
      return {
        ...item,
        checked: !item.checked,
      };
    });
    const buttonRemove = changeChecked.filter((item) => item.checked);
    if (buttonRemove.length > 0) {
      setButtonRemove(true);
    } else {
      setButtonRemove(false);
    }
    setAgendaDia(changeChecked);
  };

  const handleSelectUnits = (id) => {
    const changeChecked = agendaDia.map((item) => {
      if (item.id_agenda === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });

    const buttonRemove = changeChecked.filter((item) => item.checked);
    if (buttonRemove.length > 0) {
      setButtonRemove(true);
    } else {
      setButtonRemove(false);
    }

    setAgendaDia(changeChecked);
  };

  return (
    <>
      <div className='cardDia-container'>
        <p>Resumo do dia {formatDate}</p>
        <div
          className={buttonRemove ? 'cardDia-header visible' : 'cardDia-header'}
        >
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              handleDeleteAllHours();
            }}
          >
            Remover Selecionados
          </button>
        </div>
        {loading ? (
          <CustomLoading />
        ) : (
          <table className='tableCardDia'>
            <thead className='thCardDia'>
              <tr>
                <th className='check-all-items'>
                  <input
                    type='checkbox'
                    name='selectAll'
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Período</th>
                <th className='sortDia' onClick={handleSort}>
                  <p>Horário</p>
                  <Icon />
                </th>
                <th>Agendado</th>
                <th>Tempo Livre</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody className='tbodyCardDia'>
              {agendaDia.map((item) => (
                <tr key={item.id_agenda}>
                  <td className='check-all-items'>
                    <input
                      type='checkbox'
                      name='select'
                      checked={item.checked}
                      onChange={() => handleSelectUnits(item.id_agenda)}
                    />
                  </td>
                  <td>{item.periodo}</td>
                  <td>{moment.unix(item.hr_inicio + 10800).format('HH:mm')}</td>
                  <td>
                    {item.agendado === true ? (
                      <span className=''>Sim</span>
                    ) : (
                      <span className=''>Não</span>
                    )}
                  </td>
                  <td>{item.minutos_disponiveis} min</td>
                  <td>
                    <FaTrash
                      type='button'
                      onClick={() => {
                        handleDeleteHour(item.id_agenda);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className='adicionaAgenda'>
          <button type='button' onClick={toggleModal}>
            Adicionar Novo horário{' '}
          </button>
        </div>
      </div>
      <ModalAdicionaHora
        openModal={modal}
        toggleModal={toggleModal}
        idBarbeiro={convertIdBarbeiro}
      />
      <ConfirmRemove
        ids={modalConfirm.id}
        deleteAll={deleteAll}
        open={modalConfirm.isOpen}
        id={modalConfirm.id}
        toggleModal={toggleConfirmModal}
      />
    </>
  );
}
