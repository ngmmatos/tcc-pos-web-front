import React ,{ useEffect } from 'react';
import { useProcedures } from '../../../../hooks/useProcedures';
import './styles.scss';

export const ProcedureModal1Step = () => {

  const { proceduresSelected, setProceduresSelected, setTimeNeedeToRealizeProcedure } = useProcedures();

  const { 
    getProcedureList , 
    procedureList
  } = useProcedures();

  useEffect(() => {
      getProcedureList();
  }, []);

  useEffect(() => {} , [procedureList]);  

  console.log(procedureList)

  function handleChange({ target }) {

    if (target.checked) {
      console.log(`target - ${target} `)
      let formatedProcedure = procedureList && procedureList.find(procedure => procedure.id_procedimento === Number(target.value));
      setProceduresSelected([...proceduresSelected, formatedProcedure]);

    } else {
      setProceduresSelected(proceduresSelected && proceduresSelected.filter((procedure) => Number(procedure?.id_procedimento) !== Number(target.value)));
    }
  }

  return (
    <div className='procedureModalContent'>
      <table>
        <thead>
          <tr>
            <th>Selecionar</th>
            <th>Procedimentos</th>
            <th>Valor</th>
            <th>Tempo médio (min)</th>
          </tr>
        </thead>
        <tbody>
          {procedureList.map(procedure => (
            <tr key={procedure.id_procedimento}>
              <td>
                <input type="checkbox" checked={proceduresSelected.some(element => Number(element.id_procedimento) === Number(procedure.id_procedimento))} value={procedure.id_procedimento} onChange={handleChange} />
              </td>
              <td>{procedure.procedimento}</td>
              <td>R$ {procedure.valor}</td>
              <td>{procedure.tempo_medio}</td>
            </tr>
          ))}
          {console.log(proceduresSelected)}
        </tbody>
      </table>
    </div>
  );
}