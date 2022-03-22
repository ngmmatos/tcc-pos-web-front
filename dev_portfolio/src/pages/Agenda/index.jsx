import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { CustomCalendar } from '../../components/Calendario';
import { ImScissors } from 'react-icons/im';
import { useProcedures } from '../../hooks/useProcedures';

import './styles.scss';

export function Agenda () {
    
    const { 
        barberList, 
        getBarberList, 
        setBarberSelected , 
        agenda , 
        dailyAgenda, 
        loadAgenda , 
        todaAgenda , 
        loadAgendaByMonth, 
        monthlyAgenda, 
        barberId, 
        setBarberId } = useProcedures();

    useEffect(() => {
        getBarberList();
    }, []);

    useEffect(() => {
        loadAgenda();
    } , [barberList]);

    

    return(
        <Layout title="Agenda">
            <div className='agendaContainer'>
                <div className='selectContainer'>
                    <ImScissors />
                    <div>
                        <label htmlFor="barberList">Barbeiro(a)</label>
                        <select onChange={ ({target}) => setBarberId(target.value)} required>
                            <option value="">Selecione um barbeiro</option>
                            { barberList && barberList.map(barber =>
                                <option key={barber.id_barbeiro} value={barber.id_barbeiro}>{barber.Usuario.nome}</option> 
                            )}
                        </select>
                    </div>
                </div>  
                <CustomCalendar />
            </div>
        </Layout>
    );
}