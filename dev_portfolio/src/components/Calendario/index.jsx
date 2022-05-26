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
import { useWindowDimensions } from '../../hooks/useDimensions';

import { filterDaysAvaliable, catchDays } from './filterDaysAvaliable';
import { getTimeSelectedProcedures } from './filterProcedures';

import { api } from '../../services/api';

import 'react-calendar/dist/Calendar.css';
import './styles.scss';

export const CustomCalendar = ({ setToggleModal }) => {
  const { width } = useWindowDimensions();

  const {
    barberId,
    proceduresSelected,
    daysAgendaMonthCurrent,
    setDaysAgendaMonthCurrent,
    setDaySelected,
  } = useProcedures();

  const date = new Date();
  const [eventsByDay, setEventsByDay] = useState([]);
  const [day, setDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);

  const [firstDayMonth, setFirstDayMonth] = useState(
    getUnixTime(new Date(date.getFullYear(), date.getMonth(), 1))
  );
  const [lastDayMonth, setLastDayMonth] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(23, 59, 59) /
      1000
  );
  const [daysAvailable, setDaysAvailable] = useState([]);

  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);

  const [year, setYear] = useState(0);

  const [calendarWidth, setCalendarWidth] = useState(0);

  useEffect(() => {
    if (width > 1093) {
      setCalendarWidth('');
    } else if (width < 1093 && width > 870) {
      setCalendarWidth('calendar-Md');
    } else if (width < 870 && width > 513) {
      setCalendarWidth('calendar-Sm');
    } else if (width < 513) {
      setCalendarWidth('calendar-Ssm');
    }
  }, [width]);

  useEffect(() => {
    (async () => {
      if (barberId.length === 6) {
        try {
          const { data } = await api.get('/agenda', {
            params: {
              id_barbeiro: barberId,
              hr_inicio: firstDayMonth,
              hr_fim: lastDayMonth,
            },
          });
          console.log(data);
          setDaysAgendaMonthCurrent(data);
        } catch (e) {
          console.log(e);
        }
      } else {
        setDaysAgendaMonthCurrent([]);
      }
    })();
  }, [barberId, firstDayMonth, lastDayMonth]);

  useEffect(() => {
    if (proceduresSelected.length > 0) {
      const { finalArrayFiltered } = filterDaysAvaliable(
        daysAgendaMonthCurrent,
        getTimeSelectedProcedures(proceduresSelected)
      );
      setDaysAvailable(finalArrayFiltered);
    }
  }, [daysAgendaMonthCurrent, proceduresSelected]);

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
    const monthSelected = fromUnixTime(firstDayMonth).getMonth();

    const constDaysMonthSelected = fromUnixTime(lastDayMonth);

    const { finalArray } = filterDaysAvaliable(
      daysAgendaMonthCurrent,
      getTimeSelectedProcedures(proceduresSelected)
    );

    const disableDates = catchDays(
      constDaysMonthSelected.getDate(),
      finalArray
    );

    if (
      view === 'month' &&
      date.getUTCMonth() === currentMonth &&
      barberId.length === 6
    ) {
      const daysArray = Array.from(Array(day + 1).keys());
      daysArray.shift();
      return (
        daysAvailable.find((dDate) => date.getUTCDate() === dDate.data) ||
        disableDates.find((dDate) => date.getUTCDate() === dDate) ||
        daysArray.find((dDate) => date.getUTCDate() === dDate)
      );
    }

    if (
      view === 'month' &&
      date.getUTCMonth() === monthSelected &&
      barberId.length === 6
    ) {
      return (
        daysAvailable.find((dDate) => date.getUTCDate() === dDate.data) ||
        disableDates.find((dDate) => date.getUTCDate() === dDate)
      );
    }
  }

  return (
    <div className='Calendario'>
      <ProcedureModal
        isOpen={isProcedureModalOpen}
        onRequestClose={() => handleCloseProcedureModal()}
      />

      <div className={calendarWidth}>
        <Calendar
          formatMonthYear={(locale, date) => {
            let formatDate = format(date, "MMMM 'de' yyyy", {
              locale: ptBR,
            });
            formatDate =
              formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
            return formatDate;
          }}
          /* calendarType="US" */
          locale='pt-BR'
          showNavigation
          maxDetail='month'
          minDetail='month'
          maxDate={new Date(year, 11, 31)}
          minDate={new Date(year, new Date().getUTCMonth(), 1)}
          next2Label={null}
          nextLabel={<FaChevronRight />}
          prev2Label={null}
          prevLabel={<FaChevronLeft />}
          tileDisabled={tileDisabled}
          onActiveStartDateChange={(value, event) => {
            if (value.action) {
              const newMonth = new Date(value.activeStartDate);

              const firstDayMonth = getUnixTime(
                new Date(newMonth.getFullYear(), newMonth.getMonth())
              );
              const lastDayMonth =
                new Date(
                  newMonth.getFullYear(),
                  newMonth.getMonth() + 1,
                  0
                ).setHours(23, 59, 59) / 1000;

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
    </div>
  );
};
