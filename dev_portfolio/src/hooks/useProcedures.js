import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


const ProcedureContext = createContext({});

export const ProcedureProvider = ({ children }) => {

    const [ agenda, setAgenda ] = useState([]);
    const [ monthlyAgenda, setMonthlyAgenda ] = useState([]);
    const [ dailyAgenda, setDailyAgenda ] = useState([]);
    const [ todaAgenda, setTodaAgenda ] = useState([]);
    const [ barberId, setBarberId ] = useState(null);
    const [ barberList, setBarberList ] = useState([]);
    const [ procedureList, setProcedureList ] = useState([]);
    const [ barberSelected, setBarberSelected ] = useState(null);
    const [ proceduresSelected, setProceduresSelected ] = useState([]);
    const [ periodSelected, setPeriodSelected ] = useState([]);
    const [ dateSelected, setDateSelected ] = useState({});
    const [ timeNeedeToRealizeProcedure, setTimeNeedeToRealizeProcedure ] = useState(0);

    useEffect(() => {
        getAgendaByBarber();
    } , [barberSelected]);

    async function getBarberList() {
        const { data } = await api.get('/barbeiro');
        setBarberList(data);
    }

    async function getProcedureList() {
        const { data } = await api.get('/procedimento');
        setProcedureList(data);
        console.log(data)
    }


    async function getProcedureList() {
        const { data } = await api.get('/procedimento');
        setProcedureList(data);
        console.log(data)
    }

    async function loadAgenda( month, year ) {
        const { data } = await api.get('/agenda');

        const dataFormatted = data.map( agenda => {
             return {
                dataAgendamento: agenda.data,
                periodo: agenda.periodo,
                inicioAtendimento: format(new Date(agenda.hr_inicio * 1000 ), 'dd/MM/yyyy-HH', { locale: ptBR }),
                fimAtendimento: format(new Date(agenda.hr_fim * 1000 ), 'dd/MM/yyyy-HH', { locale: ptBR }),
            }
        });

        const monthlyData = data.filter( agenda => {
            return format(new Date(agenda.hr_inicio * 1000 ), 'MM/yyyy', { locale: ptBR }) === `${month}/${year}`;
        });

        const formatMonthlyData = monthlyData.map( agenda => {
            return {
                dataAgendamento: agenda.data,
                periodo: agenda.periodo,
                inicioAtendimento: format(new Date(agenda.hr_inicio * 1000 ), 'dd/MM/yyyy-HH', { locale: ptBR }),
                fimAtendimento: format(new Date(agenda.hr_fim * 1000 ), 'dd/MM/yyyy-HH', { locale: ptBR }),
            }
        });

        setTodaAgenda(dataFormatted);
        setMonthlyAgenda(formatMonthlyData);
    }

    const loadProceduresByDay = async ( day, month, year ) => {

        const { data } = await api.get('/agenda');

        const monthlyData = data.filter( agenda => {
            return format(new Date(agenda.hr_inicio * 1000 ), 'MM/yyyy', { locale: ptBR }) === `${month}/${year}`;
        });

        const dailyData = await monthlyData.filter( element => {
            return format(new Date(element.hr_inicio * 1000 ), 'dd/MM/yyyy', { locale: ptBR }) == `${day}/${month}/${year}`;
        })

        const dailyDataFormatted = dailyData.map( agenda => {
            return {
                dataAgendamento: agenda.data,
                periodo: agenda.periodo,
                inicioAtendimento: format(new Date(agenda.hr_inicio * 1000 ), 'HH', { locale: ptBR }),
                fimAtendimento: format(new Date(agenda.hr_fim * 1000 ), 'HH', { locale: ptBR }),
            }
        })
        
        setDailyAgenda(dailyDataFormatted);
        

    }

    async function getAgendaByBarber() {
        const { data } = await api.get(`/agenda?id_barbeiro=${barberSelected}`);

        const dataFormatted = data.map( agenda => {
            return {
                dataAgendamento: agenda.data,
                periodo: agenda.periodo,
                inicioAtendimento: new Date(agenda.hr_inicio ),
                fimAtendimento: new Date(agenda.hr_fim ),
            }
        })
        setAgenda(dataFormatted);
    }

    async function createProcedure(data, periodo, hr_inicio, hr_fim, agendado, id_barbeiro) {

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
            console.log(error)
        }
    }

    return (
        <ProcedureContext.Provider value={{ 
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
            periodSelected,
            dateSelected,
            barberId
        }}
        >
            {children}
        </ProcedureContext.Provider>
    );
}

export const useProcedures =() => {
    
    const context = useContext(ProcedureContext);
    return context;
}