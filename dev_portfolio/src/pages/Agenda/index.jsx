import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { CustomCalendar } from '../../components/Calendario';
import { ImScissors } from 'react-icons/im';
import { useProcedures } from '../../hooks/useProcedures';

export function Agenda () {
    
    const [ barberId, setBarberId ] = useState(null);
    const { barberList, getBarberList, setBarberSelected , agenda } = useProcedures();

    useEffect(() => {
        getBarberList();
    }, []);

    

    return(
        <Layout title="Agenda">
            <div className='agendaContainer'>
                <div className='selectContainer'>
                    <ImScissors />
                    <div>
                        { console.log(agenda)}
                        <label htmlFor="barberList">Barbeiro(a)</label>
                        <select onChange={ ({target}) => setBarberSelected(target.value)} required>
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