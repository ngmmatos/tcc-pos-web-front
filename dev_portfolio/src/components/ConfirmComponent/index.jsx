import React from 'react';
import { BaseModal } from '../BaseModal';
import { CustomLoading } from '../CustomLoading';
import './style.scss';

export function ConfirmComponent({
  open,
  toggleModal,
  children,
  title,
  icon,
  confirmFunction,
  loading,
}) {
  let Icon = icon;

  return (
    <>
      <BaseModal
        openModal={open}
        title={title}
        toggleModal={toggleModal}
        icon={Icon}
      >
        {loading ? (
          <CustomLoading />
        ) : (
          <div className='container-confirm'>
            {children}

            <div className='button-confirm-container'>
              {' '}
              <button onClick={toggleModal}>Cancelar</button>
              <button
                // disabled={statuAgendado}
                onClick={confirmFunction}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </BaseModal>
    </>
  );
}
