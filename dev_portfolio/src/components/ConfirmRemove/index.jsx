import React, { useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal';
import './style.scss';
import { FaTrash } from 'react-icons/fa';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { CustomLoading } from '../CustomLoading';

export function ConfirmRemove({ open, toggleModal, id, ids, deleteAll }) {
  const [statuAgendado, setStatusAgendado] = useState(false);
  const [loading, setLoading] = useState(false);

  const verificarAgenda = async () => {
    setLoading(true);
    if (deleteAll && ids.length > 0) {
      try {
        const response = await Promise.all(
          ids.map(async (id) => {
            const response = await api.get(`/agenda/${id}`);
            return response;
          })
        );

        response.flatMap((item) => {
          if (
            item.data.agendado === true ||
            item.data.minutos_disponiveis < 60
          ) {
            setStatusAgendado(true);
          } else {
            setStatusAgendado(false);
          }
          return null;
        });

        setLoading(false);
      } catch (e) {
        console.log(e, 'quebrou aqui');
        setLoading(false);
        toast.error('Erro ao buscar agendamentos');
      }
    } else {
      try {
        const { data } = await api.get(`/agenda/${id}`);
        const verficarAgenda =
          data.agendado === true || data.minutos_disponiveis < 60;

        if (verficarAgenda) {
          setStatusAgendado(true);
          setLoading(false);
        } else {
          setStatusAgendado(false);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setStatusAgendado(false);
    verificarAgenda();
  }, [id]);

  const handleDeleteHour = async (id) => {
    if (ids.length > 0 && deleteAll) {
      try {
        const data = await Promise.all(
          ids.map(async (item) => {
            console.log(item);
            const { data } = await api.delete(`/agenda/${item}`);
            toast.success(data.message);
            toggleModal();
            return data;
          })
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const { data } = await api.delete(`/agenda/${id}`);
        toast.success(data.message);
        toggleModal();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <BaseModal
        openModal={open}
        title='Deletar horário'
        toggleModal={toggleModal}
        icon={FaTrash}
      >
        {loading ? (
          <CustomLoading />
        ) : (
          <div className='container-confirm'>
            {statuAgendado ? (
              <>
                <h3>
                  Você não pode deletar esse horário pois ele está agendado.
                </h3>
                <span>Cancele o agendamento com o Cliente</span>
              </>
            ) : (
              <h3>Deseja mesmo excluir esse horário?</h3>
            )}

            <div className='button-confirm-container'>
              {' '}
              <button onClick={toggleModal}>Cancelar</button>
              <button
                disabled={statuAgendado}
                onClick={() => handleDeleteHour(id)}
              >
                Excluir
              </button>
            </div>
          </div>
        )}
      </BaseModal>
    </>
  );
}
