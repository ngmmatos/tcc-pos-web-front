import React from 'react';
import { useProcedures } from '../../../../hooks/useProcedures';
import './styles.scss';

export const ProcedureModal1Step = () => {

  const { proceduresSelected, setProceduresSelected, setTimeNeedeToRealizeProcedure } = useProcedures();

    const procedureList = [
        { id: 1, name: 'Corte de Cabelo' , value: 25, estimatedTime: 40 },
        { id: 2, name: 'Sobrancelha' , value: 15, estimatedTime: 20 },
        { id: 3, name: 'Barba' , value: 15, estimatedTime: 30 },
        { id: 4, name: 'Luzes' , value: 50, estimatedTime: 120 },
      ]

    function handleChange({ target }) {

      if (target.checked) {
        let formatedProcedure = procedureList && procedureList.find(procedure => procedure.id === Number(target.value));
        setProceduresSelected([...proceduresSelected, formatedProcedure]);

      } else {
        setProceduresSelected(proceduresSelected && proceduresSelected.filter((procedure) => Number(procedure?.id) !== Number(target.value)));
      }
    }



    return(

        <div className='procedureModalContent'>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Procedimentos</th>
                <th>Valor</th>
                <th>Tempo médio (min)</th>
              </tr>
            </thead>
            <tbody>
              {procedureList.map(procedure => (
                <tr key={procedure.id}>
                  <td>
                  <input type="checkbox" checked={ proceduresSelected.some( element => Number(element.id) === Number(procedure.id))} value={procedure.id} onChange={handleChange} />
                  </td>
                  <td>{procedure.name}</td>
                  <td>R$ {procedure.value}</td>
                  <td>{procedure.estimatedTime}</td>
                </tr>
              ))}
              { console.log(proceduresSelected) }
            </tbody>
          </table>
        </div>


      // </div>
    );
}