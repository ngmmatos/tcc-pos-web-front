import { Layout } from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';

import { useState } from 'react';

import { CalendarioBarbeiro } from './CalendarioBarbeiro';
import CardDiaBarbeiro from '../../components/CardDia';
import { ModalAdicionarDia } from './ModalAdicionarAgenda';

export const AgendaBarbeiro = () => {
  const { userSigned } = useAuth();
  const [daySelect, setDaySelect] = useState();
  const [modalAdicionarDias, setModalAdicionarDias] = useState(false);
  const [reloadAgenda, setReloadAgenda] = useState(false);
  console.log(userSigned);

  const { barbeiro } = userSigned.roles.find((item) => item.barbeiro);
  console.log(barbeiro);

  const toggleModal = () => {
    setModalAdicionarDias(!modalAdicionarDias);
    setReloadAgenda(!reloadAgenda);
  };

  return (
    <Layout title='Minha Agenda'>
      <div style={{ width: '100%', padding: '2rem 5rem' }}>
        <CalendarioBarbeiro
          idBarbeiro={barbeiro}
          setDaySelect={setDaySelect}
          reloadAgenda={reloadAgenda}
          setReloadAgenda={setReloadAgenda}
        >
          <button
            type='button'
            className='btn btn-primary'
            style={{ margin: '0.25rem 0 1rem 0' }}
            onClick={toggleModal}
          >
            Adicionar Dias na Agenda
          </button>
        </CalendarioBarbeiro>
        <CardDiaBarbeiro daySelect={daySelect} idBarbeiro={barbeiro} />
      </div>

      <ModalAdicionarDia
        isOpen={modalAdicionarDias}
        toggleModal={toggleModal}
        idBarbeiro={barbeiro}
      />
    </Layout>
  );
};
