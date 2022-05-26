import React from 'react';
import { useProcedures } from '../../../../hooks/useProcedures';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import './styles.scss';

export const ProcedureModal3Step = () => {

    const { proceduresSelected, periodSelected, dateSelected } = useProcedures();

    return(
        <div className='procedureResume'>
            <table>
                <thead>
                    <tr><th></th><th></th></tr>
                </thead>
                <tbody>
                    { proceduresSelected && proceduresSelected?.map(procedure => (
                        <tr key={procedure.id}>
                            <td><p>Procedimento: </p></td>
                            <td><span>{procedure.name}</span></td>
                        </tr>
                    ))}
                    <tr>
                        <td><p>Data: </p></td>
                        <td><span>{ format(new Date(dateSelected.year,dateSelected.month,dateSelected.day,periodSelected[0].start,0,0), 'dd/MM/yyyy - HH:mm', { locale: ptBR})} </span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}