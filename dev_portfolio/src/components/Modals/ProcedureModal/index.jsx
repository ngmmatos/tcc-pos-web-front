import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ProcedureModal1Step } from './ProcedureModal1Step';
import { ProcedureModal2Step } from './ProcedureModal2Step';
import Loading from "../../../components/Loading";
import { HiX } from 'react-icons/hi';
import './styles.scss';
import { useProcedures } from '../../../hooks/useProcedures';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useAuth } from "../../../hooks/useAuth";

const FormTitles = ['Escolha o Procedimento', 'Escolha o Horário'];


export const ProcedureModal = ({ isOpen, onRequestClose, onSubmit }) => {

  const cookies = new Cookies();
  const cookieLoaded = cookies.get('barbearia');

  const { searchUser, registerScheduler, loading } = useAuth();

  const { idAgenda, setIdAgenda, proceduresSelected } = useProcedures();
  const [step, setStep] = useState(1);
  // const [scheduleNotSelected, setScheduleNotSelected] = useState(false);

  const history = useHistory();
  // const renderFormView = () => {
  //   if (step === 1) {
  //     return <ProcedureModal1Step />
  //   } else {
  //     return <ProcedureModal2Step />
  //   }
  // }

  const handleSubmitAgenda = () => {
    if (idAgenda === null) {
      toast.error("Selecione um horário para continuar!")
      // setScheduleNotSelected(true)
      return
    }
    
    
    const user = async () => {
      const resp = await searchUser(cookieLoaded.user.id_usuario)
      registerScheduler(idAgenda, resp, proceduresSelected)
        }

    user()
    }


    // setIdAgenda(null)
    // history.push('/geral')


  const hanldeCloseModal = () => {
    onRequestClose();
    setStep(1);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={hanldeCloseModal}
        className="react-modal-close"
      >
        <HiX size="1.5rem" />
      </button>

      <div className='procedureModalContainer'>
        <h1>Escolha o Horário</h1>
        <ProcedureModal2Step />

        {/* {scheduleNotSelected && <strong style={{ color: '#f00' }}>Para prosseguir, selecione um horario</strong>} */}
        <button
          className="nextStep"
          onClick={handleSubmitAgenda}
          type="button"
        >
        { loading ? <Loading /> : "Agendar"}
        </button>

      </div>

    </Modal>
  );
}