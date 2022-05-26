import { useState } from 'react';
import { api } from '../../services/api';

const moment = require('moment');

const useAgendamento = () => {
  const [agendaBarbeiro, setAgendaBarbeiro] = useState();

  const getAgendaBarbeiro = async (idBarbeiro) => {
    try {
      const { data } = await api.get(`/agendamento?id_barbeiro=${idBarbeiro}`);

      const dataFormatted = data.map((scheduler) => {
        const hora_correta = scheduler.data_realizacao + 10800;
        const calculoValor = scheduler.ProcedimentoAgendamentos.reduce(
          (acc, item) => {
            return acc + item.Procedimento.valor;
          },
          0
        );

        const tempoMedio = scheduler.ProcedimentoAgendamentos.map(
          (item) => item.Procedimento.tempo_medio
        );
        const verificaDataProcedimento = scheduler.data_realizacao;
        let somaTempoMedio = 0;

        for (var i = 0; i < tempoMedio.length; i++) {
          somaTempoMedio += tempoMedio[i];
        }
        const dateNow = moment(new Date()).unix();

        let statusProcedimento = '';
        if (dateNow > verificaDataProcedimento) {
          statusProcedimento = 'Encerrado';
        } else if (dateNow < verificaDataProcedimento) {
          statusProcedimento = 'Agendado';
        } else {
          statusProcedimento = 'Não Iniciado';
        }

        return {
          nomeCliente: scheduler.Cliente.Usuario.nome,
          idAgenda: scheduler.id_agenda,
          valor: calculoValor,
          id: scheduler.id_agendamento,
          idCliente: scheduler.id_cliente,
          id_barbeiro: scheduler.Agenda.id_barbeiro,
          barbeiro: scheduler.Agenda.Barbeiro.Usuario.nome,
          periodo: scheduler.Agenda.periodo,
          procedimentos: scheduler.ProcedimentoAgendamentos,
          realizacao: moment.unix(hora_correta).format('HH:mm'),
          dataProcedimento: moment
            .unix(verificaDataProcedimento)
            .format('DD/MM'),
          tempoProcedimento: somaTempoMedio,
          horaInicio: scheduler.Agenda.hr_inicio,
          horaFim: scheduler.Agenda.hr_fim,
          status: statusProcedimento,
        };
      });
      setAgendaBarbeiro(dataFormatted);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    agendaBarbeiro,
    getAgendaBarbeiro,
  };
};

export { useAgendamento };
