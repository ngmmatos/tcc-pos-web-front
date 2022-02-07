
import React from 'react'
import { Layout } from './Layout';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../scss/calendario.scss';

export function Calendario () {
    return(
        <Layout title="Calendario">
            <div className="Calendario" >
                <Calendar/>
            </div>     
        </Layout>
    );
}