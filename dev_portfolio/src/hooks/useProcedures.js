import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
const moment = require('moment');

process.env.TZ = 'America/Sao_Paulo';

const ProcedureContext = createContext({});

export const ProcedureProvider = ({ children }) => {
  const [agenda, setAgenda] = useState([]);
  const [monthlyAgenda, setMonthlyAgenda] = useState([]);
  const [dailyAgenda, setDailyAgenda] = useState([]);
  const [todaAgenda, setTodaAgenda] = useState([]);
  const [barberId, setBarberId] = useState('');
  const [barberList, setBarberList] = useState([]);
  const [procedureList, setProcedureList] = useState([]);
  const [clientScheduler, setClientScheduler] = useState([]);
  // const [ barber, setBarber ] = useState([]);
  const [barberSelected, setBarberSelected] = useState(null);
  const [proceduresSelected, setProceduresSelected] = useState([]);
  const [periodSelected, setPeriodSelected] = useState([]);
  const [dateSelected, setDateSelected] = useState({});
  const [timeNeedeToRealizeProcedure, setTimeNeedeToRealizeProcedure] =
    useState(0);

  const [daysAgendaMonthCurrent, setDaysAgendaMonthCurrent] = useState([]);
  const [daySelected, setDaySelected] = useState([]);

  const [idAgenda, setIdAgenda] = useState(null);

  useEffect(() => {
    getAgendaByBarber();
  }, [barberSelected]);

  async function getBarberList() {
    const { data } = await api.get('/barbeiro');
    setBarberList(data);
  }

  // async function getBarber(id) {
  //     const { data } = await api.get(`/barbeiro/${id}`);
  //     setBarber(data);
  // }

  async function getProcedureList() {
    const { data } = await api.get('/procedimento');
    const dataFormatted = data.map((scheduler) => {
      return {
        id_procedimento: scheduler.id_procedimento,
        procedimento: scheduler.procedimento,
        valor: scheduler.valor,
        tempo_medio: scheduler.tempo_medio,
        descricao: scheduler.descricao,
      };
    });

    setProcedureList(dataFormatted);
  }

  async function getClientScheduler(id) {
    const hora = new Date(Date.now());
    const agora = hora.getTime()

    const { data } = await api.get(`/agendamento?id_cliente=${id}`)
    const dataFiltrade = data.filter(function(value) {
        if (value.data_realizacao > parseInt((agora/1000)-10800)){
        return value;
        }
    });

    const dataFormatted = dataFiltrade.map( scheduler => {
      console.log(scheduler.data_realizacao)
      console.log(parseInt((agora/1000)-10800))

          let lista_procedimentos = []
          let valor_total = 0

          const procedimento = (scheduler.ProcedimentoAgendamentos).map(proc =>{

              lista_procedimentos.push(`${proc.Procedimento.procedimento}, `)

              valor_total = valor_total + proc.Procedimento.valor
          });

          const hora_correta = (scheduler.data_realizacao + 10800)

          return {
              id: scheduler.id_agendamento,
              id_barbeiro: scheduler.Agenda.id_barbeiro,
              barbeiro: scheduler.Agenda.Barbeiro.Usuario.nome,
              periodo: scheduler.Agenda.periodo,
              realizacao: moment.unix(scheduler.data_realizacao).format('DD/MM/yyy'),
              agendamento: moment.unix(scheduler.data_agendamento).format('DD/MM/yyy'),
              hora_atendimento: moment.unix(hora_correta).format('HH:mm'),
              procedimentos: lista_procedimentos,
              valor: valor_total
          }

      });
    setClientScheduler(dataFormatted);
  }

  async function getAgendaByBarber() {
    const { data } = await api.get(`/agenda?id_barbeiro=${barberSelected}`);

    const dataFormatted = data.map((agenda) => {
      return {
        dataAgendamento: agenda.data,
        periodo: agenda.periodo,
        inicioAtendimento: new Date(agenda.hr_inicio),
        fimAtendimento: new Date(agenda.hr_fim),
      };
    });
    setAgenda(dataFormatted);
  }

  async function loadAgenda(month, year) {
    const { data } = await api.get('/agenda');

    const dataFormatted = data.map((agenda) => {
      return {
        dataAgendamento: agenda.data,
        periodo: agenda.periodo,
        inicioAtendimento: format(
          new Date(agenda.hr_inicio * 1000),
          'dd/MM/yyyy-HH',
          { locale: ptBR }
        ),
        fimAtendimento: format(
          new Date(agenda.hr_fim * 1000),
          'dd/MM/yyyy-HH',
          { locale: ptBR }
        ),
      };
    });

    const monthlyData = data.filter((agenda) => {
      return (
        format(new Date(agenda.hr_inicio * 1000), 'MM/yyyy', {
          locale: ptBR,
        }) === `${month}/${year}`
      );
    });

    const formatMonthlyData = monthlyData.map((agenda) => {
      return {
        dataAgendamento: agenda.data,
        periodo: agenda.periodo,
        inicioAtendimento: format(
          new Date(agenda.hr_inicio * 1000),
          'dd/MM/yyyy-HH',
          { locale: ptBR }
        ),
        fimAtendimento: format(
          new Date(agenda.hr_fim * 1000),
          'dd/MM/yyyy-HH',
          { locale: ptBR }
        ),
      };
    });

    setTodaAgenda(dataFormatted);
    setMonthlyAgenda(formatMonthlyData);
  }

  const loadProceduresByDay = async (day, month, year) => {
    const { data } = await api.get('/agenda');

    const monthlyData = data.filter((agenda) => {
      return (
        format(new Date(agenda.hr_inicio * 1000), 'MM/yyyy', {
          locale: ptBR,
        }) === `${month}/${year}`
      );
    });

    const dailyData = await monthlyData.filter((element) => {
      return (
        format(new Date(element.hr_inicio * 1000), 'dd/MM/yyyy', {
          locale: ptBR,
        }) === `${day}/${month}/${year}`
      );
    });

    const dailyDataFormatted = dailyData.map((agenda) => {
      return {
        dataAgendamento: agenda.data,
        periodo: agenda.periodo,
        inicioAtendimento: format(new Date(agenda.hr_inicio * 1000), 'HH', {
          locale: ptBR,
        }),
        fimAtendimento: format(new Date(agenda.hr_fim * 1000), 'HH', {
          locale: ptBR,
        }),
      };
    });

    setDailyAgenda(dailyDataFormatted);
  };

  async function createProcedure(
    data,
    periodo,
    hr_inicio,
    hr_fim,
    agendado,
    id_barbeiro
  ) {
    try {
      await api.post('/agenda', {
        agendado,
        data,
        hr_fim,
        hr_inicio,
        id_barbeiro,
        periodo,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProcedureContext.Provider
      value={{
        // getBarber,
        getClientScheduler,
        getProcedureList,
        getBarberList,
        loadAgenda,
        loadProceduresByDay,
        getAgendaByBarber,
        setBarberSelected,
        setProceduresSelected,
        setTimeNeedeToRealizeProcedure,
        setPeriodSelected,
        setDateSelected,
        createProcedure,
        setBarberId,
        todaAgenda,
        monthlyAgenda,
        dailyAgenda,
        barberSelected,
        agenda,
        barberList,
        procedureList,
        proceduresSelected,
        timeNeedeToRealizeProcedure,
        daysAgendaMonthCurrent,
        setDaysAgendaMonthCurrent,
        periodSelected,
        dateSelected,
        barberId,
        // barber,
        clientScheduler,
        daySelected,
        setDaySelected,
        idAgenda,
        setIdAgenda,
      }}
    >
      {children}
    </ProcedureContext.Provider>
  );
};

export const useProcedures = () => {
  const context = useContext(ProcedureContext);
  return context;
};
