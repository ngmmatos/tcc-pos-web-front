import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ProcedureModal1Step } from './ProcedureModal1Step';
import { ProcedureModal2Step } from './ProcedureModal2Step';
import { HiX } from 'react-icons/hi';
import './styles.scss';


const FormTitles = ['Escolha o Procedimento', 'Escolha o Horário'];



export const ProcedureModal = ({ isOpen, onRequestClose, onSubmit }) => {

  const [step, setStep] = useState(1);

  // const renderFormView = () => {
  //   if (step === 1) {
  //     return <ProcedureModal1Step />
  //   } else {
  //     return <ProcedureModal2Step />
  //   }
  // }

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
        <button className="nextStep" type="button">Continuar</button>

      </div>

    </Modal>
  );
}