import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { format } from 'date-fns';


const ProcedureContext = createContext({});

export const ProcedureProvider = ({ children }) => {

    const [ agenda, setAgenda ] = useState([]);
    const [ barberList, setBarberList ] = useState([]);
    const [ barberSelected, setBarberSelected ] = useState(null);
    const [ proceduresSelected, setProceduresSelected ] = useState([]);

    useEffect(() => {
        getAgenda();
    } , [barberSelected]);

    async function getBarberList() {
        const { data } = await api.get('/barbeiro');
        setBarberList(data);
    }

    async function getAgenda() {
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



    return (
        <ProcedureContext.Provider value={{getBarberList, getAgenda, barberSelected, setBarberSelected, agenda, barberList, proceduresSelected , setProceduresSelected}}>
            {children}
        </ProcedureContext.Provider>
    );
}

export const useProcedures =() => {
    
    const context = useContext(ProcedureContext);
    return context;
}