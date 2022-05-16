import Calendar from 'react-calendar';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { api } from '../../../services/api';
import { useProcedures } from '../../../hooks/useProcedures';
import {
  catchDays,
  filterDaysAvaliable,
} from '../../../components/Calendario/filterDaysAvaliable';
import './style.scss';

export const CalendarioBarbeiro = ({
  idBarbeiro,
  setDaySelect,
  reloadAgenda,
  setReloadAgenda,
  children,
}) => {
  const { daysAgendaMonthCurrent, setDaysAgendaMonthCurrent } = useProcedures();

  const date = new Date();
  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectDays, setSelectDay] = useState([]);
  const [firstDayMonth, setFirstDayMonth] = useState(
    getUnixTime(new Date(date.getFullYear(), date.getMonth(), 1))
  );
  const [lastDayMonth, setLastDayMonth] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(23, 59, 59) /
      1000
  );

  useEffect(() => {
    const getSchedulerBarber = async (idBarbeiro) => {
      try {
        const { data } = await api.get('/agenda', {
          params: {
            id_barbeiro: idBarbeiro,
            hr_inicio: firstDayMonth,
            hr_fim: lastDayMonth,
          },
        });
        setReloadAgenda(false);
        setDaysAgendaMonthCurrent(data);
      } catch (e) {
        console.log(e);
        setDaysAgendaMonthCurrent([]);
      }
    };
    getSchedulerBarber();
  }, [idBarbeiro, firstDayMonth, lastDayMonth, reloadAgenda]);

  const handleSelectDay = (day) => {
    const dayUnit = day.getDate();

    if (selectDays.find((item) => item === dayUnit)) {
      const newSelectDays = selectDays.filter((item) => item !== dayUnit);
      setSelectDay(newSelectDays);
      console.log(newSelectDays);
    } else {
      setSelectDay([...selectDays, dayUnit]);
    }
  };

  useEffect(() => {
    const today = new Date(Date.now());

    setDay(today.getUTCDate());
    setCurrentMonth(today.getUTCMonth());
    setYear(today.getUTCFullYear());
  }, []);

  function tileDisabled({ date, view }) {
    const monthSelected = fromUnixTime(firstDayMonth).getMonth();

    const constDaysMonthSelected = fromUnixTime(lastDayMonth);

    const { finalArray } = filterDaysAvaliable(daysAgendaMonthCurrent);

    const disableDates = catchDays(
      constDaysMonthSelected.getDate(),
      finalArray
    );

    if (view === 'month' && date.getUTCMonth() === currentMonth) {
      const daysArray = Array.from(Array(day).keys());
      daysArray.shift();

      return (
        disableDates.find((dDate) => date.getUTCDate() === dDate) ||
        daysArray.find((dDate) => date.getUTCDate() === dDate)
      );
    }

    if (view === 'month' && date.getUTCMonth() === monthSelected) {
      return disableDates.find((dDate) => date.getUTCDate() === dDate);
    }
  }
  return (
    <div className='calendario-barbeiro'>
      <Calendar
        formatMonthYear={(locale, date) => {
          let formatDate = format(date, "MMMM 'de' yyyy", {
            locale: ptBR,
          });
          formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
          return formatDate;
        }}
        locale='pt-BR'
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
        }}
        onClickDay={(value) => {
          handleSelectDay(value);
          setDaySelect(value);
        }}
      />
      {children}
    </div>
  );
};
