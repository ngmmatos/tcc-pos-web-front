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
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ProcedureModal } from '../Modals/ProcedureModal';


import 'react-calendar/dist/Calendar.css';
import './styles.scss';


export const CustomCalendar = ({ setToggleModal }) => {

  const [eventsByDay, setEventsByDay] = useState([]);
  const [day, setDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const [ isProcedureModalOpen ,setIsProcedureModalOpen ] = useState(false);

  const [year, setYear] = useState(0);

  useEffect(() => {
    const today = new Date(Date.now());

    setDay(today.getUTCDate());
    setCurrentMonth(today.getUTCMonth());
    setYear(today.getUTCFullYear());
  }, []);

  function handleOpenProcedureModal () {
    setIsProcedureModalOpen(true);
  }
  function handleCloseProcedureModal () {
      setIsProcedureModalOpen(false);
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
        // onActiveStartDateChange={(value, event) => {
        //   setEventsByDay([]);
        //   const newMonth = new Date(value.activeStartDate);
        // //   setCalendarMonth(newMonth.getUTCMonth());
        // //   loadEventsByMonth(newMonth.getUTCMonth());
        // }}
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