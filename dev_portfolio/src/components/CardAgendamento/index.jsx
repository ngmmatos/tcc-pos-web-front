import { getUnixTime } from 'date-fns';
import { useState } from 'react';

import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { RiCurrencyFill } from 'react-icons/ri';
import { ConfirmComponent } from '../ConfirmComponent/index';

import '../CardAtendimento/style.scss';

export const CardDetalhe = ({ agendamento, refreshingAgenda }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalFinalizar, setModalFinalizar] = useState(false);
  const [tempoParaFinalizar, setTempoParaFinalizar] = useState(
    agendamento.tempoProcedimento * 60
  );

  const photoBarbeiro = `https://ui-avatars.com/api/?name=${agendamento.nomeCliente}&length=2`;

  const handleStartAtendimento = async (idAgenda) => {
    setLoading(true);
    try {
      Promise.all(
        await api.post('/atendimento', {
          valor: agendamento.valor,
          id_agendamento: agendamento.id,
          id_status_atendimento: 3,
          data_inicio: getUnixTime(new Date()) - 10800,
          data_fim: getUnixTime(new Date()) - 10200,
        }),
        await api.put(`/agendamento/${agendamento.id}`, {
          id_agenda: agendamento.idAgenda,
          id_cliente: agendamento.idCliente,
          data_realizacao: getUnixTime(new Date()) - 10800,
          data_agendamento: getUnixTime(new Date()) - 10200,
        })
      );
      setModalFinalizar(false);
      refreshingAgenda(agendamento.id_barbeiro);
      toast.success('Atendimento iniciado com Sucesso');
    } catch (e) {
      setModalFinalizar(false);
      setLoading(false);

      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/agendamento/${id}`);
      toast.success('Agendamento Excluido com Sucesso');
      setModalDelete(false);
      refreshingAgenda(agendamento.id_barbeiro);
      setLoading(false);
    } catch (e) {
      setModalDelete(false);
      setLoading(false);
      console.log(e);
    }
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };
  const toggleModalFinalizar = () => {
    setModalFinalizar(!modalFinalizar);
  };

  var minutes = Math.floor(tempoParaFinalizar / 60);
  var seconds = tempoParaFinalizar % 60;

  return (
    <div className='cardAgenda'>
      <div className='userInfo'>
        <img className='userImg' src={photoBarbeiro} alt='user' />
        <p className='timeAgenda'>
          {agendamento.realizacao} - {agendamento.periodo} -{' '}
          {agendamento.dataProcedimento}
        </p>
        <h3 className='userName'>
          {agendamento.nomeCliente.split(' ').slice(0, 2).join(' ')}
        </h3>
      </div>
      <div className='container-procedimentos'>
        <table className='procedimentos'>
          <thead>
            <tr>
              <th>Procedimentos</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {agendamento.procedimentos.map((procedimento) => (
              <tr key={procedimento.id_procedimento}>
                <td>{procedimento.Procedimento.descricao}</td>
                <td
                  className={
                    agendamento.status === 'Encerrado' ? 'finalizado' : ''
                  }
                >
                  {agendamento.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='valor-legenda'>
          Valor{' '}
          {agendamento.procedimentos.length > 1
            ? 'dos procedimentos'
            : 'do procedimento'}{' '}
          R$ {agendamento.valor},00
        </p>
      </div>
      <div className='acoesAgenda'>
        <FaTrash
          type='button'
          className='btnAgenda'
          size={35}
          onClick={toggleModalDelete}
        />
        <h4 className='tempoMedio'>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          <p className='tempoLegenda'>Tempo estimado</p>
        </h4>
        {agendamento.status === 'Agendado' && (
          <button className='btnFinalizar' onClick={toggleModalFinalizar}>
            Iniciar Atendimento
          </button>
        )}
        {modalDelete && (
          <ConfirmComponent
            loading={loading}
            open={modalDelete}
            toggleModal={toggleModalDelete}
            title='Deletar agendamento'
            icon={FaTrash}
            confirmFunction={() => handleDelete(agendamento.id)}
          >
            <h3>
              Deseja mesmo excluir o agendamento do{' '}
              {agendamento.nomeCliente.split(' ').slice(0, 2).join(' ')}
            </h3>
          </ConfirmComponent>
        )}
        {modalFinalizar && (
          <ConfirmComponent
            loading={loading}
            open={modalFinalizar}
            toggleModal={toggleModalFinalizar}
            title='Iniciar atendimento'
            icon={RiCurrencyFill}
            confirmFunction={() => handleStartAtendimento(agendamento.id)}
          >
            <h3>
              Deseja mesmo iniciar o atendimento do{' '}
              {agendamento.nomeCliente.split(' ').slice(0, 2).join(' ')}
            </h3>
          </ConfirmComponent>
        )}
      </div>
    </div>
  );
};
