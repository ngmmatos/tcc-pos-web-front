import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CustomLoading } from '../CustomLoading';
import { DataTableComponent } from '../DataTableComponent';
import ModalUsuarios from './ModalUsuarios';
import './styles.scss';
import { MdEdit, MdDelete } from 'react-icons/md';

export const DataTableUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: '',
    user: null,
  });

  const toggleModal = () => {
    setModalOpen({ isOpen: !modalOpen.isOpen, type: '' });
  };
  const handleCreateUser = () => {
    const data = {
      nome: '',
      email: '',
      telefone: '',
      data_nascimento: '',
      sexo: '',
    };
    setModalOpen({ isOpen: true, type: 'create', user: data });
  };
  const handleEditUser = (user) => {
    setModalOpen({ isOpen: true, type: 'edit', user });
  };
  const handleDeletUser = (user) => {
    setModalOpen({ isOpen: true, type: 'delete', user });
  };

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/usuario');
      if (response.data.length > 0) {
        const fieldsUsers = response.data.map((user) => {
          return {
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,

            handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
            handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
          };
        });
        setFields(fieldsUsers);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      if (modalOpen.type === 'create') {
        await api.post('/usuario', data);
      } else if (modalOpen.type === 'edit') {
        await api.put(`/usuario/${modalOpen.user.id_usuario}`, data);
      } else if (modalOpen.type === 'delete') {
        await api.delete(`/usuario/${modalOpen.user.id_usuario}`);
      }
      getUsers();
      toggleModal();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const fieldsDataTable = [
    {
      headers: ['Nome', 'Email', 'Telefone', 'Editar', 'Excluir'],
    },
    {
      fields: fields,
    },
  ];

  return (
    <>
      <section className='section-data-table'>
        {fields.length === 0 ? (
          <CustomLoading />
        ) : (
          <div style={{ width: '100%' }}>
            <button
              className='btn btn-primary'
              onClick={() => handleCreateUser()}
            >
              Adicionar Cliente
            </button>
            <div className='wrapper-data-table'>
              <DataTableComponent fieldsDataTable={fieldsDataTable} />
            </div>
          </div>
        )}
      </section>
      {modalOpen.isOpen && (
        <ModalUsuarios
          open={modalOpen.isOpen}
          type={modalOpen.type}
          toggleModal={toggleModal}
          data={modalOpen.user}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </>
  );
};
