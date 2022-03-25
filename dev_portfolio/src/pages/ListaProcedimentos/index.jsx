/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Layout } from '../../components/Layout';
import './styles.scss';
import { useProcedures } from '../../hooks/useProcedures';

const moment = require("moment");


process.env.TZ = "America/Sao_Paulo";


export function ListaProcedimentos () {


    const { 
        getProcedureList , 
        procedureList
     } = useProcedures();

    useEffect(() => {
        getProcedureList();
    }, []);

    useEffect(() => {} , [procedureList]);

    return (
        <>
        <Layout title="Procedimentos Disponíveis">
            <div className='divProcedimentos'>
            <table>
                <thead>
                <tr>
                    <th>Procedimentos</th>
                    <th>Valor</th>
                    <th>Tempo médio</th>
                </tr>
                </thead>
                <tbody>
                {procedureList.map(procedure => (
                    <tr key={procedure.id_procedimento}>
                    <td>{procedure.procedimento}</td>
                    <td>R$ {procedure.valor},00</td>
                    <td>{procedure.tempo_medio} minutos</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>   
        </Layout> 
        </>
    );
}