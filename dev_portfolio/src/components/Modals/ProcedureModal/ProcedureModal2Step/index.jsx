import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { useProcedures } from '../../../../hooks/useProcedures';
import './styles.scss';

const periodList = [
  { id: 1, start: '06', finish: '07', period: 1},
  { id: 2, start: '08', finish: '09', period: 1},
  { id: 3, start: '09', finish: '10', period: 1},
  { id: 4, start: '10', finish: '11', period: 1},
  { id: 5, start: '11', finish: '12', period: 1},
  { id: 6, start: '13', finish: '14', period: 2},
  { id: 7, start: '14', finish: '15', period: 2},
  { id: 8, start: '15', finish: '16', period: 2},
  { id: 9, start: '16', finish: '17', period: 2},
  { id: 10, start: '17', finish: '18', period: 3},
  { id: 11, start: '18', finish: '19', period: 3},
];

// const procedureList = [
//   { id: 1, name: 'Corte de Cabelo' , value: 25, estimatedTiime: 40 },
//   { id: 2, name: 'Sobrancelha' , value: 15, estimatedTiime: 20 },
//   { id: 3, name: 'Barba' , value: 15, estimatedTiime: 30 },
//   { id: 4, name: 'Luzes' , value: 50, estimatedTiime: 120 },
// ]



export const ProcedureModal2Step = () => {
  
  const { proceduresSelected, dailyAgenda,setTimeNeedeToRealizeProcedure, timeNeedeToRealizeProcedure, periodSelected, setPeriodSelected } = useProcedures();

  function renderButton (periodId) {

    const listOfTimes = dailyAgenda.map(item => item.inicioAtendimento)
    const freePeriods = periodList.filter( period => (period.period === periodId) && !listOfTimes.includes(period.start) );
    const dailySelected = periodSelected && periodSelected?.map(item => item.id);

    return freePeriods.map( period => {
      return (
        <button key={period.id} className={dailySelected.includes(period.id) ? `periodButton${period.id} selected` : `periodButton${period.id}`}     onClick={() => handleSelectPeriod(period.id)}>
          {period.start} - {period.finish}
        </button>
      )
    })
  
  }
  const handleSelectPeriod = (id) => {

    const lenghtOfPeriodArray = periodSelected.length;
    
    const classElement = `.periodButton${id}`;
    document.querySelector(classElement).classList.toggle('selected');

    let formattedPeriod = periodList.find(period => period.id === id);
    let periodExists = periodSelected.find( period => (
      period.id === id
    ))
    setPeriodSelected(periodExists ? periodSelected.filter(item => item.id !== id) : [...periodSelected, formattedPeriod]);

    if ( lenghtOfPeriodArray >= 1) {
      document.querySelector(classElement).classList.remove('selected');
      setPeriodSelected(periodSelected.filter(item => item !== id));
      return toast.warn('Você só pode selecionar 1 horários');

    }
  }
      
    return(

        <div className='procedureModalContent'>
         { console.log(dailyAgenda)}
          <div className='wrapperContent'>
            <div className='columnContent'>
              <h2>Manhã</h2>
              <div className='periodList'>
              
                { renderButton(1)}

              </div>
              { console.log(periodSelected)}
            </div>
            <div className='columnContent'>
              <h2>Tarde</h2>
              <div className='periodList'>
               
                { renderButton(2)}
              </div>
            </div>
            <div className='columnContent'>
              <h2>Noite</h2>
              <div className='periodList'>

                { renderButton(3)}

              </div>
            </div>
          </div>
        </div>

    );
}