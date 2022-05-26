import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CustomLoading } from '../CustomLoading';
import { DataTableComponent } from '../DataTableComponent';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import ModalFornecedores from './ModalFornecedores';
import './styles.scss';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from "react-icons/ai";

export const DataTableForn = () => {
  const [forns, setForns] = useState('');
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

  const pdfGnerator = () => {
    const doc = new jsPDF()
    autoTable(doc, { html: '#tableCustom' })
    doc.save('table.pdf')

  };

  const handleCreateUser = () => {
    const data = {
      fornecedor: '',
      email: '',
      telefone: '',
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
      
      const response = await api.get('/fornecedor');
      if (response.data.length > 0) {
        const fieldsUsers = response.data.map((user) => {
        
          return {
            fornecedor: user.fornecedor,
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
      toast.error(`Erro ao renderizar tabela - ${e}`)

    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      let todosCampos = true
      if (modalOpen.type === 'create') {

        let campos = true
        for (let verifica in data) {
          if (data[verifica] === '') {
            campos = false
          }
        }

        if (campos) {
          await api.post('/fornecedor', data)
        } else {
          toast.error("É necessário preencher todos os campos!")
          todosCampos = false
        };

      } else if (modalOpen.type === 'edit') {

           await api.put(`/fornecedor/${modalOpen.user.id_fornecedor}`, data)

      } else if (modalOpen.type === 'delete') {

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }

        async function demo() {
              await sleep(3000);
              console.log('Done');
        }

        demo().then(x => {
          const delFornecedor = api.delete(`/fornecedor/${modalOpen.user.id_fornecedor}`).then(() => {
            getUsers();
            toggleModal();
          });
        });
      }
      if (todosCampos) {
        toast.success("Ação realizada com sucesso")
      }
    } catch (e) {
      console.log(e);
      toast.error(`Erro ao realizar ação - ${e}`)
    } finally {
      getUsers();
      toggleModal();
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const searchForn = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      
      const response = await api.get(`/fornecedor?fornecedor=${forns}`);
      if (response.data.length > 0) {
        const fieldsUsers = response.data.map((user) => {
        
          return {
            fornecedor: user.fornecedor,
            email: user.email,
            telefone: user.telefone,

            handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
            handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
          };
        });
        setFields(fieldsUsers);
      } else {
  
        const fieldsContas = () => {
          return [{
            fornecedor: '',
            email: '',
            telefone: '',
  
            // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
          
          }];
        }
        setFields(fieldsContas);
      }
    } catch (e) {
      console.log(e);
      toast.error(`Erro ao renderizar tabela - ${e}`)

    } finally {
      setLoading(false);
      }
    };


  const fieldsDataTable = [
    {
      headers: ['Fornecedor', 'Email', 'Telefone', 'Editar', 'Excluir'],
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
            <div className="section-header">
              <button
                className='btn btn-primary'
                onClick={() => handleCreateUser()}
              >   Adicionar Fornecedor
                 </button>
              <form onSubmit={searchForn}>  
                  <input type="text" placeholder="Buscar por nome" name="search" onChange={ ({target}) => setForns(target.value)}/>
                  <button className='btn btn-primary' type="submit" ><AiOutlineSearch/></button>
              </form>
              <button
                className='btn btn-primary'
                onClick={() => pdfGnerator()}
              >
                <BsFillFileEarmarkPdfFill/> Exportar PDF
              </button>
            </div>
            <div className='wrapper-data-table'>
              <DataTableComponent fieldsDataTable={fieldsDataTable} />
            </div>
          </div>
        )}
      </section>
      {modalOpen.isOpen && (
        <ModalFornecedores
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
