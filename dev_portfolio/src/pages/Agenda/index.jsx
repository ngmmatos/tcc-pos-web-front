import React from 'react';
import { Layout } from '../../components/Layout';
import { Calendario } from '../../components/Calendario';

export function Agenda () {
    return(
        <Layout title="Agenda">
           <Calendario />
        </Layout>
    );
}