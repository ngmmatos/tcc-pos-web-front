import React from 'react';
import './style.scss';
import { RiCloseCircleLine } from 'react-icons/ri';

export function BaseModal({ title, openModal, toggleModal, children, icon }) {
  const Icon = icon;
  return (
    <>
      {openModal && (
        <div className='modal-base'>
          <div className='modal-base-content'>
            <header className='modal-base-header'>
              <div className='modal-base-text'>
                {icon ? <Icon size={20} /> : ''}
                <h1>{title}</h1>
              </div>
              <RiCloseCircleLine
                className='modal-base-close'
                size={30}
                onClick={toggleModal}
              />
            </header>
            <section>{children}</section>
          </div>
        </div>
      )}
    </>
  );
}
