import { getUnixTime } from 'date-fns';
import { useState, useEffect } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { RiCurrencyFill } from 'react-icons/ri';
import { ConfirmComponent } from './../../components/ConfirmComponent/index';

import './style.scss';

export const CardAtendimento = ({ atendimento, refreshingAtendimento }) => {
  const [pauseAgendamento, setPauseAgendamento] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalFinalizar, setModalFinalizar] = useState(false);
  const [tempoParaFinalizar, setTempoParaFinalizar] = useState(
    atendimento.tempoProcedimento * 60
  );
  const photoCliente = `https://ui-avatars.com/api/?name=${atendimento.nomeCliente}&length=2`;

  const handleFinish = async () => {
    setLoading(true);
    try {
      console.log(atendimento)
      const dataAtendimento = {
        valorTotal: atendimento.valor,
        id_agendamento: atendimento.idAgendamento,
        id_status_atendimento: 1,
        data_inicio: atendimento.horaInicio,
        data_fim: getUnixTime(new Date()) - 10800,
      };

      const response = await api.put(
        `/atendimento/${atendimento.idAtendimento}`,
        dataAtendimento
      );

      // const recebimento = {
      //   id_status_recebimento: 52,
      //   id_atendimento: atendimento.idAtendimento,
      //   data_recebimento: getUnixTime(new Date()) - 10800,
      //   informacao: "Atendimento finalizado e pagamento recebido",
      // };

    const responseRecebimento = await api.post('/recebimento', {
        id_status_recebimento: 54,
        id_atendimento: atendimento.idAtendimento,
        data_recebimento: getUnixTime(new Date()) - 10800,
        informacao: "Atendimento finalizado e pagamento recebido"
    });

    toast.success('Atendimento finalizado e pagamento recebido com sucesso');
    } catch (e) {
      setLoading(false);

      console.log(e);
    } finally {
      setLoading(false);
      setModalFinalizar(false);
      refreshingAtendimento(atendimento.id_barbeiro);
    }
  };

  const toggleModalFinalizar = () => {
    setModalFinalizar(!modalFinalizar);
  };
  useEffect(() => {
    if (tempoParaFinalizar > 0 && pauseAgendamento) {
      setTimeout(() => {
        setTempoParaFinalizar((state) => state - 1);
      }, 1000);
    }
  }, [tempoParaFinalizar, pauseAgendamento]);

  var minutes = Math.floor(tempoParaFinalizar / 60);
  var seconds = tempoParaFinalizar % 60;

  return (
    <div className='cardAgenda'>
      <div className='userInfo'>
        <img className='userImg' src={photoCliente} alt='user' />
        <p className='timeAgenda'>
          {atendimento.realizacao} - {atendimento.periodo} -{' '}
          {atendimento.dataProcedimento}
        </p>
        <h3 className='userName'>
          {atendimento.nomeCliente.split(' ').slice(0, 2).join(' ')}
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
            {atendimento.procedimentos.map((procedimento) => (
              <tr key={procedimento.id_procedimento}>
                <td>{procedimento.Procedimento.descricao}</td>
                <td
                  className={
                    atendimento.status === 'finalizado' ? 'finalizado' : ''
                  }
                >
                  {atendimento.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='valor-legenda'>
          Valor{' '}
          {atendimento.status === 'finalizado'
            ? 'recebido '
            : atendimento.procedimentos.length > 1
            ? 'dos procedimentos '
            : 'do procedimento '}
          R$ {atendimento.valorTotal},00
        </p>
      </div>
      <div
        className='acoesAgenda'
        style={{
          justifyContent:
            atendimento.status === 'finalizado' ? 'center' : 'space-between',
        }}
      >
        {atendimento.status !== 'finalizado' && (
          <>
            {pauseAgendamento ? (
              <AiFillPauseCircle
                className='btnAgenda'
                type='button'
                size={35}
                onClick={() => setPauseAgendamento(!pauseAgendamento)}
              />
            ) : (
              <AiFillPlayCircle
                className='btnAgenda'
                type='button'
                size={35}
                onClick={() => setPauseAgendamento(!pauseAgendamento)}
              />
            )}
          </>
        )}

        <h4
          className={pauseAgendamento ? 'tempoMedio pausaAgenda' : 'tempoMedio'}
        >
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          <p className='tempoLegenda'>Tempo estimado</p>
        </h4>
        {atendimento.status === 'iniciado' && (
          <button className='btnFinalizar' onClick={toggleModalFinalizar}>
            Finalizar
          </button>
        )}

        {modalFinalizar && (
          <ConfirmComponent
            loading={loading}
            open={modalFinalizar}
            toggleModal={toggleModalFinalizar}
            title='Finalizar Atendimento'
            icon={RiCurrencyFill}
            confirmFunction={() => handleFinish()}
          >
            <h3>
              Deseja mesmo finalizar o atendimento do{' '}
              {atendimento.nomeCliente.split(' ').slice(0, 2).join(' ')}
            </h3>
            <p style={{ color: '#444', fontSize: '1rem', marginTop: '10px' }}>
              {' '}
              Ao confirmar, você confirma o recebimento do valor R$
              {atendimento.valorTotal},00?
            </p>
          </ConfirmComponent>
        )}
      </div>
    </div>
  );
};
