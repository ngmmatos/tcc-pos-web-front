import { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import {
  FaBirthdayCake,
  FaCalendarCheck,
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
  FaPlusSquare,
} from 'react-icons/fa';
import { format, getTime, getUnixTime, fromUnixTime } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ProcedureModal } from '../Modals/ProcedureModal';
import { useProcedures } from '../../hooks/useProcedures';

import { filterDaysAvaliable } from './filterDaysAvaliable'

import { api } from '../../services/api'

import 'react-calendar/dist/Calendar.css';
import './styles.scss';

export const CustomCalendar = ({ setToggleModal }) => {

  const {
    barberId,
    proceduresSelected,
    daysAgendaMonthCurrent,
    setDaysAgendaMonthCurrent,
    setDaySelected
  } = useProcedures();

  const date = new Date()
  const [eventsByDay, setEventsByDay] = useState([]);
  const [day, setDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);

  const [firstDayMonth, setFirstDayMonth] = useState(getUnixTime(new Date(date.getFullYear(), date.getMonth(), 1)));
  const [lastDayMonth, setLastDayMonth] = useState(new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(23, 59, 59) / 1000);
  const [daysAvailable, setDaysAvailable] = useState([]);

  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);

  const [year, setYear] = useState(0);

  function getTimeSelectedProcedures(proceduresSelected) {
    let getTimeSelectedProcedures = [...proceduresSelected]
    if (getTimeSelectedProcedures.length > 1) {
      let timeSelectedProcedures = (getTimeSelectedProcedures.map(value => value.estimatedTime)).reduce((previousValue, currentValue) => previousValue + currentValue)
      return timeSelectedProcedures
    } else {
      return proceduresSelected[0].estimatedTime
    }
  }

  useEffect(() => {
    (async () => {
      if (barberId.length === 6) {
        try {
          const { data } = await api.get('/agenda', {
            params:
            {
              id_barbeiro: barberId,
              hr_inicio: firstDayMonth,
              hr_fim: lastDayMonth
            }
          })
          setDaysAgendaMonthCurrent(data);
        } catch (e) {
          console.log(e)
        }

      } else {
        setDaysAgendaMonthCurrent([])
      }
    })()
  }, [barberId, firstDayMonth, lastDayMonth]);

  useEffect(() => {
    if (proceduresSelected.length > 0) {
      const finalArrayFiltered = filterDaysAvaliable(daysAgendaMonthCurrent, getTimeSelectedProcedures(proceduresSelected))
      setDaysAvailable(finalArrayFiltered)
    }
  }, [daysAgendaMonthCurrent, proceduresSelected])

  useEffect(() => {
    const today = new Date(Date.now());

    setDay(today.getUTCDate());
    setCurrentMonth(today.getUTCMonth());
    setYear(today.getUTCFullYear());
  }, []);

  function handleOpenProcedureModal() {
    setIsProcedureModalOpen(true);
  }
  function handleCloseProcedureModal() {
    setIsProcedureModalOpen(false);
  }

  function tileDisabled({ date, view }) {
    const monthSelected = fromUnixTime(firstDayMonth).getMonth()

    if (view === 'month' && date.getUTCMonth() === monthSelected) {
      return daysAvailable.find(dDate => date.getUTCDate() === dDate.data) || date.getDay() === 6 || date.getDay() === 0
    }
  }

  return (
    <div className="Calendario" >
      <ProcedureModal
        isOpen={isProcedureModalOpen}
        onRequestClose={() => handleCloseProcedureModal()}
      />

      <Calendar
        formatMonthYear={(locale, date) => {
          let formatDate = format(date, "MMMM 'de' yyyy", {
            locale: ptBR,
          });
          formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
          return formatDate;
        }}
        /* calendarType="US" */
        locale="pt-BR"
        showNavigation
        maxDetail="month"
        minDetail="month"
        maxDate={new Date(year, 11, 31)}
        minDate={new Date(year, new Date().getUTCMonth(), 1)}
        next2Label={null}
        nextLabel={<FaChevronRight />}
        prev2Label={null}
        prevLabel={<FaChevronLeft />}
        tileDisabled={barberId.length === 6 ? tileDisabled : undefined}
        onActiveStartDateChange={(value, event) => {
          if (value.action) {
            const newMonth = new Date(value.activeStartDate);

            const firstDayMonth = getUnixTime(new Date(newMonth.getFullYear(), newMonth.getMonth()));
            const lastDayMonth = (new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 0).setHours(23, 59, 59) / 1000);

            setFirstDayMonth(firstDayMonth);
            setLastDayMonth(lastDayMonth);
          }
          //   setCalendarMonth(newMonth.getUTCMonth());
          //   loadEventsByMonth(newMonth.getUTCMonth());
        }}
        onClickDay={(value) => {
          if (barberId.length === 6) {
            handleOpenProcedureModal();
            setDaySelected(value.getDate());
          }
          // if (
          //   value.getMonth() === calendarMonth &&
          //   eventsByDay?.filter((item) => {
          //     return item.day === value.getDate();
          //   }).length > 0
          // ) {
          // setEvents(
          //   eventsByDay?.filter((item) => {
          //     return item.day === value.getDate();
          //   })[0],
          // );
          // }
        }}
      />
    </div>
  );
};