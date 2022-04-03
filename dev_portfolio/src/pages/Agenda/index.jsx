import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useHistory } from 'react-router-dom'
import { useProcedures } from '../../hooks/useProcedures';
import { ProcedureModal1Step } from '../../components/Modals/ProcedureModal/ProcedureModal1Step'

import '../../components/Modals/ProcedureModal/styles.scss';
import './styles.scss';
import { toast } from 'react-toastify';

export function Agenda() {
    const [isProcedureNotSelected, setIsProcedureNotSelected] = useState(false);
    const history = useHistory();

    const {
        proceduresSelected,
        barberList,
        getBarberList,
        loadAgenda, } = useProcedures();

    useEffect(() => {
        getBarberList();
    }, []);

    useEffect(() => {
        loadAgenda();
    }, [barberList]);

    const handleNavigate = () => {
        if (proceduresSelected.length > 0) {
            // setIsProcedureNotSelected(false)
            history.push('/agenda-calendar')
        }
        else {
            toast.error("Selecione pelo menos um procedimento para continuar!")
            // setIsProcedureNotSelected(true)
        }
    }

    return (
        <Layout title="Agenda">
            <div className='procedureModalContainer'>
                <h1>Escolha o Procedimento</h1>
                <ProcedureModal1Step />
                {/* {isProcedureNotSelected && <strong className="errorText">Selecione um procedimento para prosseguir com o agendamento</strong>} */}
                <button className="nextStep" type="button" onClick={handleNavigate}>Continuar</button>
            </div>
        </Layout>
    );
}