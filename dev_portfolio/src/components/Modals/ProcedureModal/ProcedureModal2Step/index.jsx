import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { useProcedures } from '../../../../hooks/useProcedures';
import './styles.scss';

const periodList = [
  { id: 1, start: 8, finish: 9, period: 1},
  { id: 2, start: 9, finish: 10, period: 1},
  { id: 3, start: 10, finish: 11, period: 1},
  { id: 4, start: 11, finish: 12, period: 1},
  { id: 5, start: 13, finish: 14, period: 2},
  { id: 6, start: 14, finish: 15, period: 2},
  { id: 7, start: 15, finish: 16, period: 2},
  { id: 8, start: 16, finish: 17, period: 2},
  { id: 9, start: 17, finish: 18, period: 3},
  { id: 10, start: 18, finish: 19, period: 3},
];

export const ProcedureModal2Step = () => {

  const [period, setPeriod] = useState([]);
  const { proceduresSelected } = useProcedures();

  const handleSelectPeriod = (id) => {

    const lenghtOfPeriodArray = period.length;

    const classElement = `.periodButton${id}`;
    document.querySelector(classElement).classList.toggle('selected');
    setPeriod(period.includes(id) ? period.filter(item => item !== id) : [...period, id]);

    if ( lenghtOfPeriodArray > 2) {
      document.querySelector(classElement).classList.remove('selected');
      setPeriod(period.filter(item => item !== id));
      return toast.warn('Você só pode selecionar 2 horários');

    } else {

      const procedureTimeNeeded = proceduresSelected.reduce((acc, procedure) => {
        return acc + procedure.estimatedTiime;
      }, 0);

      if( procedureTimeNeeded <= 60 && period.length === 2) {
        document.querySelector(classElement).classList.remove('selected');
        setPeriod(period.filter(item => item !== id));
        return toast.warn('Selecione apenas 1 horários para esse atendimento');
      }

      if (procedureTimeNeeded > 60 && period.length === 1) {
        // document.querySelector(classElement).classList.remove('selected');
        // setPeriod(period.filter(item => item !== id));
        return toast.warn('Selecione 2 horários para esse atendimento');
      }

      if( procedureTimeNeeded > 60) {
        for(let i = 0; i < periodList.length -1; i++) {
         const consecutivo = periodList[i].id === periodList[i+1].id - 1;

          if( !consecutivo ) {
            document.querySelector(classElement).classList.remove('selected');
            setPeriod(period.filter(item => item !== id));
            return toast.warn('Selecione 2 horários consecutivos para esse atendimento');
          }
        }
      }

    }

    // [x] VERIFICAR QUANTOS PERIODOS FORAM SELECIONADOS
    // [x] SE MAIS DE 3 PERIODOS FOREM SELECIONADOS, REMOVER O ULTIMO PERIODO SELECIONADO
    // [x] SE O PROCEDIMENTO NÃO NECESSITAR DE 2 PERIODOS, REMOVER O ULTIMO PERIODO SELECIONADO
    // [x] SE O PROCEDIMENTO PRECISAR DE 2 PERÍODOS E OS PERIODOS SELECIONADOS NÃO FOREM CONSECUTIVOS, REMOVER O ULTIMO PERIODO SELECIONADO
    // [] SE O PROCEDIMENTO PRECISAR DE 2 PERIODOS E NÃO HOUVER PERIODOS CONSECUTIVOS DISPONÍVEIS, INFORMAR QUE NÃO HÁ HORÁRIOS DISPONÍVEIS PARA AQUELE PROCEDIEMNTO 
  }
      
    return(

        <div className='procedureModalContent'>
         
          <div className='wrapperContent'>
            <div className='columnContent'>
              <h2>Manhã</h2>
              <div className='periodList'>
                {periodList.map(period => period.period === 1 && (
                  <button key={period.id} className={`periodButton${period.id}`} onClick={() =>handleSelectPeriod(period.id)}><p>{period.start} - { period.finish }</p></button>
                ))}
              </div>
            </div>
            <div className='columnContent'>
              <h2>Tarde</h2>
              <div className='periodList'>
                {periodList.map(period => period.period === 2 && (
                  <button key={period.id} className={`periodButton${period.id}`} onClick={() =>handleSelectPeriod(period.id)}><p>{period.start} - { period.finish }</p></button>
                ))}
              </div>
            </div>
            <div className='columnContent'>
              <h2>Noite</h2>
              <div className='periodList'>
                {periodList.map(period => period.period === 3 && (
                  <button key={period.id} className={`periodButton${period.id}`} onClick={() =>handleSelectPeriod(period.id)}><p>{period.start} - { period.finish }</p></button>
                ))}
              </div>
            </div>
          </div>
        </div>

    );
}