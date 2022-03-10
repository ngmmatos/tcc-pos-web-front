import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ProcedureModal1Step } from './ProcedureModal1Step';
import { ProcedureModal2Step } from './ProcedureModal2Step';
import { HiX } from 'react-icons/hi';
import './styles.scss';


const FormTitles = [ 'Escolha o Procedimento', 'Escolha o Horário'];



export const ProcedureModal = ({ isOpen, onRequestClose, onSubmit }) => {

  const [ step, setStep ] = useState(1);

  const renderFormView = () => {
    if(step === 1) {
      return <ProcedureModal1Step />
    } else {
      return <ProcedureModal2Step />
    }
  }

  const hanldeCloseModal = () => {
    onRequestClose();
    setStep(1);
  }



    return(
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
          <h1>{FormTitles[step-1]}</h1>
          { renderFormView() }

          { step > 1 && <button className="nextStep" type="button" onClick={() => setStep(step - 1)}>Voltar</button> }
          { step !== FormTitles.length && <button className="nextStep" type="button" onClick={() => setStep(step +1 )}>Continuar</button> }

        </div>

      </Modal>
    );
}