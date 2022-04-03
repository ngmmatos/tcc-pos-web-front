import React, { useEffect, useState } from 'react';
import { useProcedures } from '../../../../hooks/useProcedures';
import './styles.scss';
import { fromUnixTime } from 'date-fns'
import { getTimeSelectedProcedures } from '../../../Calendario/filterProcedures'

export const ProcedureModal2Step = () => {
  const {
    dailyAgenda,
    periodSelected,
    daysAgendaMonthCurrent,
    daySelected,
    idAgenda,
    setIdAgenda,
    proceduresSelected
  } = useProcedures();
  const [timeAvailabilityDay, setTimeAvailabilityDay] = useState([]);

  const handleSelectAgenda = (item) => {
    if (item.id_agenda === idAgenda) {
      setIdAgenda(null)
      return
    }

    setIdAgenda(item.id_agenda)
  }
  const convertTimestampValue = (date) => {
    const dateUnitTtime = fromUnixTime(date)

    const verifyHours = dateUnitTtime.getHours().toString().length > 1 ? dateUnitTtime.getHours() : '0' + dateUnitTtime.getHours()
    const verifyMinutes = dateUnitTtime.getMinutes().toString().length > 1 ? dateUnitTtime.getMinutes() : dateUnitTtime.getMinutes() + '0'

    return verifyHours + ':' + verifyMinutes
  }

  const newArrayDataValues = (data) => {
    return data.map(item => {
      return {
        ...item,
        hr_inicio: convertTimestampValue(item.hr_inicio + 10800),
        hr_fim: convertTimestampValue(item.hr_fim + 10800)
      }
    })
  }

  useEffect(() => {
    let copyDaysAgendaMonthCurrent = [...daysAgendaMonthCurrent]
    const daysSelectedFiltered = copyDaysAgendaMonthCurrent.filter(item => item.data === daySelected).filter(data => data.agendado === false).filter(data => data.minutos_disponiveis >= getTimeSelectedProcedures(proceduresSelected))
    setTimeAvailabilityDay(newArrayDataValues(daysSelectedFiltered))
  }, [daySelected, daysAgendaMonthCurrent])

  return (

    <div className='procedureModalContent'>
      <div className='wrapperContent'>
        <div className='columnContent'>
          <h2>Manhã</h2>
          <div className='periodList'>
            {timeAvailabilityDay.map((item) => {
              return (
                item.periodo === 'manha' && (
                  <button key={item.id_agenda} className={idAgenda === item.id_agenda ? 'selected' : 'periodButton'} onClick={() => handleSelectAgenda(item)}>
                    {item.hr_inicio} - {item.hr_fim}
                  </button>
                )
              )
            })}
          </div>
        </div>
        <div className='columnContent'>
          <h2>Tarde</h2>
          <div className='periodList'>
            {timeAvailabilityDay.map((item) => {
              return (
                item.periodo === 'tarde' && (
                  <button key={item.id_agenda} className={idAgenda === item.id_agenda ? 'selected' : 'periodButton'} onClick={() => handleSelectAgenda(item)}>
                    {item.hr_inicio} - {item.hr_fim}
                  </button>
                )
              )
            })}
          </div>
        </div>
        <div className='columnContent'>
          <h2>Noite</h2>
          <div className='periodList'>
            {timeAvailabilityDay.map((item) => {
              return (
                item.periodo === 'noite' && (
                  <button key={item.id_agenda} className={idAgenda === item.id_agenda ? 'selected' : 'periodButton'} onClick={() => handleSelectAgenda(item)}>
                    {item.hr_inicio} - {item.hr_fim}
                  </button>
                )
              )
            })}
          </div>
        </div>
      </div>
    </div>

  );
}