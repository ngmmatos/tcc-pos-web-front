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
import { format, getTime } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ProcedureModal } from '../Modals/ProcedureModal';
import { useProcedures } from '../../hooks/useProcedures';

import { api } from '../../services/api'

import 'react-calendar/dist/Calendar.css';
import './styles.scss';

export const CustomCalendar = ({ setToggleModal }) => {

  const { barberId, setBarberId } = useProcedures();

  const [eventsByDay, setEventsByDay] = useState([]);
  const [day, setDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const [firstDayMonth, setFirstDayMonth] = useState(0);
  const [lastDayMonth, setLastDayMonth] = useState(0);
  const [actualMonthSchedule, setActualMonthSchedule] = useState([]);

  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);

  const [year, setYear] = useState(0);

  useEffect(() => {
    (async () => {
      if (barberId.length === 6) {
        const { data } = await api.get('/agenda', {
          id_barbeiro: barberId,
          hr_inicio: firstDayMonth,
          hr_fim: lastDayMonth
        })
        setActualMonthSchedule(data);
      }
    })()
  }, [barberId, firstDayMonth, lastDayMonth]);

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

  function getMonthInnerDaysTimestamp(year, month) {
    const firstDayMonth = getTime(new Date(year, month, 1)) / 1000;
    const lastDayMonth = getTime(new Date(year, month + 1, 0).setHours(23, 59, 59) / 1000);

    return { firstDayMonth, lastDayMonth }
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
        minDate={new Date(year, 0, 1)}
        next2Label={null}
        nextLabel={<FaChevronRight />}
        prev2Label={null}
        prevLabel={<FaChevronLeft />}
        tileDisabled={({ activeStartDate, date, view }) => date.getDate() === 25}
        onActiveStartDateChange={(value, event) => {
          setEventsByDay([]);
          const newMonth = new Date(value.activeStartDate);

          const { firstDayMonth, lastDayMonth } = getMonthInnerDaysTimestamp(newMonth.getUTCFullYear(), newMonth.getUTCMonth())
          console.log(firstDayMonth, lastDayMonth);

          // setFirstDayMonth(firstDayMonth);
          // setLastDayMonth(lastDayMonth);

          //   setCalendarMonth(newMonth.getUTCMonth());
          //   loadEventsByMonth(newMonth.getUTCMonth());
        }}
        onClickDay={(value) => {
          // if (
          //   value.getMonth() === calendarMonth &&
          //   eventsByDay?.filter((item) => {
          //     return item.day === value.getDate();
          //   }).length > 0
          // ) {
          handleOpenProcedureModal();
          setSelectedDay(value.getDate());
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