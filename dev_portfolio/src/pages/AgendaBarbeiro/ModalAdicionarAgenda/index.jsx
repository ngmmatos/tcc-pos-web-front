import Calendar from 'react-calendar';
import { FaTrash } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState, useCallback } from 'react';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { api } from '../../../services/api';
import { useProcedures } from '../../../hooks/useProcedures';
import { filterDaysAvaliable } from '../../../components/Calendario/filterDaysAvaliable';
import './style.scss';
import { BaseModal } from '../../../components/BaseModal';

import 'moment/locale/pt-br';
import { toast } from 'react-toastify';
import { CustomLoading } from '../../../components/CustomLoading';
import { useAuth } from '../../../hooks/useAuth';
const moment = require('moment');

export const ModalAdicionarDia = ({ isOpen, toggleModal }) => {
  const { userSigned } = useAuth();
  const { barbeiro } = userSigned.roles.find((item) => item.barbeiro);
  const { daysAgendaMonthCurrent, setDaysAgendaMonthCurrent } = useProcedures();

  const date = new Date();
  const [year, setYear] = useState(0);

  const [loading, setLoading] = useState(false);

  const [objectDays, setObjectDays] = useState([]);

  const [expandCalendar, setExpandCalendar] = useState(false);
  const [firstDayMonth, setFirstDayMonth] = useState(
    getUnixTime(new Date(date.getFullYear(), date.getMonth(), 1))
  );
  const [lastDayMonth, setLastDayMonth] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(23, 59, 59) /
      1000
  );

  const getSchedulerBarber = useCallback(async () => {
    try {
      const { data } = await api.get('/agenda', {
        params: {
          id_barbeiro: barbeiro,
          hr_inicio: firstDayMonth,
          hr_fim: lastDayMonth,
        },
      });

      setDaysAgendaMonthCurrent(data);
    } catch (e) {
      console.log(e);
      setDaysAgendaMonthCurrent([]);
    }
  }, [barbeiro, firstDayMonth, lastDayMonth, setDaysAgendaMonthCurrent]);

  useEffect(() => {
    getSchedulerBarber();
  }, [getSchedulerBarber]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await Promise.all(
        objectDays.map(async (item) => {
          const data = {
            id_barbeiro: barbeiro,
            dias: item.day,
            mes: item.month + 1,
            ano: item.year,
          };
          const response = await api.post('/agenda/create', data);
          return response;
        })
      );
      toast.success('Dias adicionados com sucesso!');
      setLoading(false);
      setObjectDays([]);
      toggleModal();
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error('Erro ao adicionar dia(s) na agenda');
    }
  };

  const filterMonth = (arr, arr2) => {
    arr.forEach((element) => {
      let match = arr2.find((r) => r.month === element.month);
      if (match) {
      } else {
        arr2.push({
          month: element.month,
          day: [],
          year: element.year,
        });
      }
    });

    arr2.map((item) => {
      arr.map((e) => {
        if (e.month === item.month) {
          if (typeof e.day === 'object') {
            e.day.map((z) => {
              item.day.push(z);
            });
          } else {
            item.day.push(e.day);
          }
        }
      });
    });
    return arr2;
  };

  const handleSelectDay = (day) => {
    const dayUnit = day.getDate();
    const monthUnit = day.getMonth();
    const yearUnit = day.getFullYear();
    const daysObject = [
      {
        day: [dayUnit],
        month: monthUnit,
        year: yearUnit,
      },
    ];

    const monthSplit = filterMonth(daysObject, objectDays);
    const reRender = [...monthSplit];
    setObjectDays(reRender);
  };

  useEffect(() => {
    const today = new Date(Date.now());

    setYear(today.getUTCFullYear());
  }, []);

  const handleConfirmChangeMonth = (event) => {
    event.preventDefault();
  };

  function getWeekdaysInMonth(month, year) {
    const days = [];

    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      if (![1, 2, 3, 4, 5].includes(date.getDay())) days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  function tileDisabled({ date, view }) {
    const yearSelected = fromUnixTime(firstDayMonth).getFullYear();
    const monthSelected = fromUnixTime(firstDayMonth).getMonth();

    const daysSelected = objectDays.reduce((acc, day) => {
      if (day.year === yearSelected && day.month === monthSelected) {
        day.day.map((d) => {
          acc.push(d);
        });
      }
      return acc;
    }, []);

    let days = [];

    const arrayDays = getWeekdaysInMonth(monthSelected, yearSelected);
    const { finalArray } = filterDaysAvaliable(daysAgendaMonthCurrent);
    const availableDays = finalArray.map((item) => item.data);
    const disabledDate = days.concat(arrayDays, availableDays, daysSelected);

    if (view === 'month' && date.getUTCMonth() === monthSelected) {
      return disabledDate.find((dDate) => date.getUTCDate() === dDate);
    }
  }

  const handleDeleteMonth = (monthSelected) => {
    const filterMonth = objectDays.filter((item) => {
      return item.month !== monthSelected;
    });
    setObjectDays(filterMonth);
  };

  const handleDeleteDay = (daySelected, monthSelected) => {
    const filterMonth = objectDays.filter((item) => {
      return item.month === monthSelected;
    });
    const filterDayInMonth = filterMonth.map((item) => {
      return item.day.filter((day) => {
        return day !== daySelected;
      });
    });

    const setDaysInMonth = filterMonth.map((item) => {
      return {
        ...item,
        day: filterDayInMonth[0],
      };
    });

    const removeMonth = objectDays.filter((item) => {
      return item.month !== monthSelected;
    });

    if (filterDayInMonth[0].length > 0) {
      setObjectDays([...removeMonth, ...setDaysInMonth]);
    } else {
      setObjectDays(removeMonth);
    }
  };

  return (
    <>
      {isOpen && (
        <BaseModal
          openModal={isOpen}
          toggleModal={toggleModal}
          title='Adicionar Dia(s) na agenda'
        >
          {loading ? (
            <CustomLoading />
          ) : (
            <div style={{ padding: '0 2rem' }}>
              <div className='btn-container'>
                <button
                  className='btn btn-primary'
                  onClick={() => setExpandCalendar(!expandCalendar)}
                >
                  Expandir Calendario
                </button>
              </div>

              <div
                className={
                  expandCalendar ? 'calendarioModal expand' : 'calendarioModal'
                }
              >
                <Calendar
                  formatMonthYear={(locale, date) => {
                    let formatDate = format(date, "MMMM 'de' yyyy", {
                      locale: ptBR,
                    });
                    formatDate =
                      formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
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
                  onClickMonth={(date, event) => {
                    handleConfirmChangeMonth(event);
                  }}
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
                  }}
                />
              </div>
              <div className='btn-container flexEnd'>
                <button
                  className='btn btn-primary'
                  onClick={() => setObjectDays([])}
                >
                  Resetar Calendario
                </button>
              </div>
              <div className='selectDays'>
                <p>Dias Selecionados</p>
                <div className='selectDaysContainer'>
                  {objectDays.length > 0 &&
                    objectDays.map((item) => (
                      <>
                        <div className='selectDaysContainerItem'>
                          <p key={item.day} className='month-paragrafo'>
                            {item.month &&
                              moment()
                                .locale('pt-br')
                                .month(item.month)
                                .format('MMMM')}
                          </p>
                          <FaTrash
                            onClick={() => handleDeleteMonth(item.month)}
                          />
                        </div>
                        <div className='day-selected'>
                          {item.day.map((day) => (
                            <button
                              className='day-paragrafo'
                              onClick={() => handleDeleteDay(day, item.month)}
                            >
                              <p>{day}</p>
                            </button>
                          ))}
                        </div>
                      </>
                    ))}
                </div>
                <footer className='footer-agenda'>
                  <button
                    className='btn btn-primary'
                    onClick={() => handleSubmit()}
                  >
                    Adicionar
                  </button>
                </footer>
              </div>
            </div>
          )}
        </BaseModal>
      )}
    </>
  );
};
