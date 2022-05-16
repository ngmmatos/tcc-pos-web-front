import { useState } from 'react';
import { api } from '../../services/api';

const moment = require('moment');

const useAtendimento = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAtendimentoBarbeiro(idBarbeiro, params) {
    setLoading(true);
    try {
      const { data } = await api.get(`/atendimento`, {
        params: {
          id_barbeiro: idBarbeiro,
          ...params,
        },
      });

      const dataFormatted = data.map((scheduler) => {
        const hora_correta = scheduler.Agendamento.data_realizacao + 10800;
        const calculoValor =
          scheduler.Agendamento.ProcedimentoAgendamentos.reduce((acc, item) => {
            return acc + item.Procedimento.valor;
          }, 0);

        const tempoMedio = scheduler.Agendamento.ProcedimentoAgendamentos.map(
          (item) => item.Procedimento.tempo_medio
        );
        const verificaDataProcedimento = scheduler.Agendamento.data_realizacao;
        let somaTempoMedio = 0;

        for (var i = 0; i < tempoMedio.length; i++) {
          somaTempoMedio += tempoMedio[i];
        }

        return {
          idAtendimento: scheduler.id_atendimento,
          nomeCliente: scheduler.Agendamento.Cliente.Usuario.nome,
          idAgenda: scheduler.Agendamento.id_agenda,
          valorTotal: calculoValor,
          idAgendamento: scheduler.Agendamento.id_agendamento,
          idCliente: scheduler.Agendamento.id_cliente,
          id_barbeiro: scheduler.Agendamento.Agenda.id_barbeiro,
          barbeiro: scheduler.Agendamento.Agenda.Barbeiro.Usuario.nome,
          periodo: scheduler.Agendamento.Agenda.periodo,
          procedimentos: scheduler.Agendamento.ProcedimentoAgendamentos,
          realizacao: moment.unix(hora_correta).format('HH:mm'),
          dataProcedimento: moment
            .unix(verificaDataProcedimento)
            .format('DD/MM'),
          tempoProcedimento: somaTempoMedio,
          horaInicio: scheduler.Agendamento.Agenda.hr_inicio,
          horaFim: scheduler.Agendamento.Agenda.hr_fim,
          status: scheduler.StatusAtendimento.status_atendimento,
        };
      });
      setLoading(false);
      setAtendimentos(dataFormatted);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return {
    atendimentos,
    loading,
    getAtendimentoBarbeiro,
  };
};

export { useAtendimento };
