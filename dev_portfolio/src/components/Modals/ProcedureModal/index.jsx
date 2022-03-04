import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { HiX } from 'react-icons/hi';
import './styles.scss';

const procedureList = [
  { id: 1, name: 'Corte de Cabelo' , value: 25, estimatedTiime: 40 },
  { id: 2, name: 'Sobrancelha' , value: 15, estimatedTiime: 20 },
  { id: 3, name: 'Barba' , value: 15, estimatedTiime: 30 },
  { id: 4, name: 'Luzes' , value: 50, estimatedTiime: 120 },
]

// useEffect( () => {});

export const ProcedureModal = ({ isOpen, onRequestClose, onSubmit }) => {

  const [ step, setStep ] = useState(1);

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <HiX size="1.5rem" />
        </button>

        { step === 1 ?

            <div className='procedureModalContainer'>
              <h1>Escolha o procedimento</h1>

              <div className='procedureModalContent'>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Procedimentos</th>
                      <th>Valor</th>
                      <th>Tempo médio (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedureList.map(procedure => (
                      <tr key={procedure.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{procedure.name}</td>
                        <td>R$ {procedure.value}</td>
                        <td>{procedure.estimatedTiime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button type='button' onClick={() => console.log('seguir para o proximo passo')}>Continuar</button>

            </div>
          :
            <div className='procedureModalContainer'>
              <h1>Escolha o horário</h1>

              {/* <div className='procedureModalContent'>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Procedimentos</th>
                      <th>Valor</th>
                      <th>Tempo médio (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedureList.map(procedure => (
                      <tr key={procedure.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{procedure.name}</td>
                        <td>R$ {procedure.value}</td>
                        <td>{procedure.estimatedTiime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}

              <button type='button' onClick={() => setStep(2)}>Continuar</button>

            </div>
        }

      </Modal>
    );
}