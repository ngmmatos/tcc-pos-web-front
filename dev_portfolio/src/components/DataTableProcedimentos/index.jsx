import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CustomLoading } from '../CustomLoading';
import { DataTableComponent } from '../DataTableComponent';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import ModalProcedimentos from './ModalProcedimentos';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import './styles.scss';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from "react-icons/ai";

export const DataTableProcedimento = () => {
  const [procedimentos, setProcedimentos] = useState([]);
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
      procedimento: '',
      valor: '',
      tempo_medio: '',
      descricao: null,
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
      
      const response = await api.get('/procedimento');
      if (response.data.length > 0) {
        const fieldsUsers = response.data.map((user) => {
          
          return {
            procedimento: user.procedimento,
            valor: `R$${user.valor}`,
            tempo_medio: `${user.tempo_medio} min`,
            descricao: user.descricao,

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

  const searchProcedimentos = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await api.get(`/procedimento?procedimento=${procedimentos}`);
      if (response.data.length > 0) {
        const fieldsUsers = response.data.map((user) => {
          
          return {
            procedimento: user.procedimento,
            valor: `R$${user.valor}`,
            tempo_medio: `${user.tempo_medio} min`,
            descricao: user.descricao,

            handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
            handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
          };
        });
        setFields(fieldsUsers);
      } else {
  
        const fieldsContas = () => {
          return [{
            procedimento: '',
            valor: '',
            tempo_medio: '',
            descricao: '',
  
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
  }

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      let todosCampos = true
      let remover = true

      if (modalOpen.type === 'create') {


        let campos = true
        for (let verifica in data) {
          if (data[verifica] === '') {
            campos = false
          }
        }

        if (campos) {
          await api.post('/procedimento', data)
        } else {
          toast.error("É necessário preencher todos os campos!")
          todosCampos = false
        };

      } else if (modalOpen.type === 'edit') {

           api.put(`/procedimento/${modalOpen.user.id_procedimento}`, data)


      } else if (modalOpen.type === 'delete') {

        await api.get('/agendamento').then((agendamento) => {

          if (agendamento.data.length > 0) {
            console.log(agendamento)
              agendamento.data.map((agenda) => {

                agenda.ProcedimentoAgendamentos.map((proc) => {

                  if (proc.id_procedimento ===  modalOpen.user.id_procedimento) {
                      remover = false
                    }
                });
              });
            }
        });

        if (remover) {

          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
  
          async function demo() {
                await sleep(3000);
                console.log('Done');
          }
  
          demo().then(x => {
            const delUsuario = api.delete(`/procedimento/${modalOpen.user.id_procedimento}`).then(() => {
              getUsers();
              toggleModal();
            });
          });
        } else {
          toast.error("Procedimento está vinculado a um agendamento e não pode ser excluído")
        }

      }
      if (todosCampos && remover) {
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

  const fieldsDataTable = [
    {
      headers: ['Procedimento', 'Valor', 'Tempo Médio', 'Descrição', 'Editar', 'Excluir'],
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
              >   Adicionar Procedimento
                 </button>
              <form onSubmit={searchProcedimentos}>  
                  <input type="text" placeholder="Buscar por nome" name="search" onChange={ ({target}) => setProcedimentos(target.value)}/>
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
        <ModalProcedimentos
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
