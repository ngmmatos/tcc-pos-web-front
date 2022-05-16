import React, { useState } from 'react';
import './style.scss';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import getDate from 'date-fns/getDate';
import addHours from 'date-fns/addHours';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
const moment = require('moment');

export default function ModalAdicionaHora({
  openModal,
  toggleModal,
  idBarbeiro,
}) {
  const [errorDia, setErrorDia] = useState(false);
  const [formData, setFormData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.periodo);
    const timeStampHrInicio = moment(
      formData.data.concat(' ', formData.hora, ':00')
    ).unix();
    const diaAgendado = getDate(
      new Date(formData.data.concat(' ', formData.hora, ':00'))
    );

    const adiconaHoraFinal = addHours(
      new Date(formData.data.concat(' ', formData.hora, ':00')),
      1
    );
    const timeStampHrFim = moment(adiconaHoraFinal).unix();

    try {
      const { data } = await api.post('/agenda', {
        id_barbeiro: idBarbeiro,
        hr_inicio: timeStampHrInicio - 10800,
        hr_fim: timeStampHrFim - 10800,
        data: diaAgendado,
        agendado: false,
        minutos_disponiveis: 60,
        periodo: formData.periodo,
      });

      toast.success('Horário adicionado com sucesso!');
      toggleModal();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePeriodo = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setErrorDia(true);
    } else if (value <= '12:00') {
      setFormData({ ...formData, periodo: 'manha', [name]: value });
    } else if (value > '12:00' && formData.hora < '18:00') {
      setFormData({ ...formData, periodo: 'tarde', [name]: value });
    } else if (value > '19:00') {
      setFormData({ ...formData, periodo: 'noite', [name]: value });
    } else {
      setErrorDia(false);
    }
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {openModal && (
        <div className='modal-dia'>
          <div className='modal-dia-content'>
            <header className='modal-dia-header'>
              <div className='modal-dia-text'>
                <AiOutlineClockCircle size={30} />
                <h1>Adicionar Hora Livre</h1>
              </div>
              <RiCloseCircleLine
                className='modal-dia-close'
                size={30}
                onClick={toggleModal}
              />
            </header>
            <section>
              <form
                className='modal-dia-form'
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className='modal-dia-form-content'>
                  <div className='modal-dia-form-content-text'>
                    <label htmlFor='cardDia'>Selecione o dia</label>
                    {errorDia && <span>Dia obrigatório.</span>}
                  </div>
                  <div className='modal-dia-form-content-input'>
                    <input
                      type='date'
                      required
                      name='data'
                      onChange={(e) => handelInputChange(e)}
                    />
                  </div>
                </div>
                <div className='modal-dia-form-content'>
                  <div className='modal-dia-form-content-text'>
                    <label htmlFor='cardHorario'>Selecione o horário</label>

                    {errorDia && <span>Horário obrigatório.</span>}
                  </div>
                  <div className='modal-dia-form-content-input'>
                    <input
                      type='time'
                      min='07:00'
                      max='21:00'
                      required
                      step='3600'
                      name='hora'
                      onChange={(e) => handleChangePeriodo(e)}
                    />
                  </div>
                  <button className='Adicionar-button' type='submit'>
                    Adicionar
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
