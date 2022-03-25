/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Layout } from '../../components/Layout';
import './styles.scss';
import Cookies from 'universal-cookie';
import { useProcedures } from '../../hooks/useProcedures';
import { AiFillDelete } from 'react-icons/ai';
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

process.env.TZ = "America/Sao_Paulo";


export function MeusAgendamentos () {

    const { deleteScheduler } = useAuth();

    const cookies = new Cookies();
    const cookieLoaded = cookies.get('barbearia');

    const id_client = cookieLoaded.roles.find( obj => 'cliente' in obj );

    if (id_client === 'undefined') {
        toast.error("Erro ao obter dados do usuário")
    }

    const {
        clientScheduler,
        getClientScheduler,
     } = useProcedures();

    useEffect(() => {
        getClientScheduler(id_client.cliente);
    }, []);

    const handleClick = (id) => {
        if (window.confirm('Tem certeza que quer desmarcar o atendimento?')) {
            deleteScheduler(id)
                getClientScheduler(id_client.cliente);  
        } else {
            return false;
        }
    }

    return (
        <>
            <Layout title="Meus Agendamentos">
                <div className='meusAgendamentos'>

                <table>
                    <thead>
                        {clientScheduler == "" ?
                        <tr></tr> :
                    <tr>
                        <th>Barbeiro</th>
                        <th>Data agendamento</th>
                        <th>Data atendimento</th>
                        <th>Periodo</th>
                        <th>Horário</th>
                        <th>Excluir</th>
                    </tr>
                    }</thead>
                    <tbody>
                    {clientScheduler == "" ?
                    <tr>
                        <td>Não há agendamentos marcados</td>
                    </tr> :
                    clientScheduler.map(scheduler => (
                        <tr key={scheduler.id}>
                        <td>{scheduler.barbeiro}</td>
                        <td>{scheduler.agendamento}</td>
                        <td>{scheduler.realizacao}</td>
                        <td>{scheduler.periodo}</td>
                        <td>{scheduler.hora_atendimento}</td>
                        <td>
                            <button onClick={() => handleClick(scheduler.id)}><AiFillDelete size="2rem"/></button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>   
            </Layout> 
        </>
    );
}
