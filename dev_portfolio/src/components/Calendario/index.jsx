import { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { format, setMonth } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ProcedureModal } from '../Modals/ProcedureModal';
import {toast} from 'react-toastify';

import 'react-calendar/dist/Calendar.css';
import './styles.scss';
import { useProcedures } from '../../hooks/useProcedures';


export const CustomCalendar = ({ setToggleModal }) => {

  const [eventsByDay, setEventsByDay] = useState([]);
  const [day, setDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const [ isProcedureModalOpen ,setIsProcedureModalOpen ] = useState(false);

  const [year, setYear] = useState(0);

  const { loadAgenda, monthlyAgenda, loadProceduresByDay, setDateSelected, barberId } = useProcedures();

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
        onActiveStartDateChange={(value, event) => {
          loadAgenda(format(value.activeStartDate, 'MM'), format(value.activeStartDate, 'yyyy'));
        }}
        onClickDay={(value) => {

          if(!barberId) {
            return toast.info('Selecione um barbeiro para agendar um procedimento.');
          }

          if( Number(new Date(value).getTime()) <= Number(new Date().getTime()) ) {
            return toast.info('Não é possível agendar nesse dia');
          }

          loadProceduresByDay(format(value, 'dd', { locale: ptBR }) , format(value, 'MM'), format(value, 'yyyy'));
          handleOpenProcedureModal();
          setDateSelected({
            day: format(value, 'dd', { locale: ptBR }),
            month: format(value, 'MM') -1,
            year: format(value, 'yyyy'),
          });
        }}   
        tileContent={({ date, view }) => {
          if (view === 'month') {
            return (
              <div className="tile-content">
                <div className="tile-content-day">
                  {/* {date.getUTCDate()} */}
                </div>
                <div className="tile-content-month">
                  {/* {date.getUTCMonth()} */}
                </div>
              </div>
            );
          }
        }}
      />
    </div>
  );
};