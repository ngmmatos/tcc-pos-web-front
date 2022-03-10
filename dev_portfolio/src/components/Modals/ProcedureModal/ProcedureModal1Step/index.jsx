import React from 'react';
import { useProcedures } from '../../../../hooks/useProcedures';
import './styles.scss';

export const ProcedureModal1Step = () => {

  const { proceduresSelected, setProceduresSelected } = useProcedures();

    const procedureList = [
        { id: 1, name: 'Corte de Cabelo' , value: 25, estimatedTiime: 40 },
        { id: 2, name: 'Sobrancelha' , value: 15, estimatedTiime: 20 },
        { id: 3, name: 'Barba' , value: 15, estimatedTiime: 30 },
        { id: 4, name: 'Luzes' , value: 50, estimatedTiime: 120 },
      ]

    function handleChange({ target }) {
      if (target.checked) {
        setProceduresSelected([...proceduresSelected, target.value]);
      } else {
        setProceduresSelected(proceduresSelected.filter((procedure) => procedure.id !== target.value.id));
      }
    }
  
    function handleChecked(procedure) {
      return proceduresSelected.includes(procedure);
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
                    <input type="checkbox" value={procedure} checked={handleChecked(procedure)} onChange={handleChange} />
                  </td>
                  <td>{procedure.name}</td>
                  <td>R$ {procedure.value}</td>
                  <td>{procedure.estimatedTiime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      // </div>
    );
}