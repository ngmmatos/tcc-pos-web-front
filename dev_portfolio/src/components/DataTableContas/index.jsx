import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CustomLoading } from '../CustomLoading';
import { DataTableComponent } from '../DataTableComponent';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import ModalContas from './ModalContas';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import './styles.scss';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, fromUnixTime} from 'date-fns';
import { AiOutlineSearch } from "react-icons/ai";

export const DataTableConta = () => {
  const [users, setUsers] = useState([]);
  const [inicialDate, setInicialDate] = useState([]);
  const [finalDate, setFinalDate] = useState([]);
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

  const handleCreateConta = () => {
    const data = {
      descricao: '',
      valor: '',
      dt_vencimento: null,
      dt_pagamento: null,
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

    const formatDate = (date) => {
      if (date !== 0) {
        return format(fromUnixTime(date), 'dd/MM/yyyy');
      } else {
        return 0
      }
    };

    try {
      
      const response = await api.get('/conta');
      if (response.data.length > 0) {
        const fieldsContas = response.data.map((user) => {

          
          return {
            descricao: user.descricao,
            valor: `R$${user.valor}`,
            vecimento: formatDate(user.dt_vencimento),
            pagamento: formatDate(user.dt_pagamento),

            handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
            handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
          };
        });
        setFields(fieldsContas);
      }
    } catch (e) {
      console.log(e);
      toast.error(`Erro ao renderizar tabela - ${e}`)

    } finally {
      setLoading(false);
    }
  }, []);

  const searchConta = async (e) => {
    e.preventDefault();

    const verificaInicial = isNaN(inicialDate)
    const verificaFinal = isNaN(finalDate)

    setLoading(true);
    
    const formatDate = (date) => {
      if (date !== 0) {
        return format(fromUnixTime(date), 'dd/MM/yyyy');
      } else {
        return 0
      }
    };
    
    
    try {
      
      if (!verificaInicial && !verificaFinal){

        const response = await api.get(`/conta?dt_vencimento_maior=${inicialDate}&dt_vencimento_menor=${finalDate}`);
        if (response.data.length > 0) {
          const fieldsContas = response.data.map((user) => {
              
              return {
                descricao: user.descricao,
                valor: `R$${user.valor}`,
                vecimento: formatDate(user.dt_vencimento),
                pagamento: formatDate(user.dt_pagamento),
    
                // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
                handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
              
              };
          });
          setFields(fieldsContas);
        } else {
  
          const fieldsContas = () => {
            return [{
              descricao: "",
              valor: "",
              vecimento: "",
              pagamento: "",
    
              // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
            
            }];
          }
          setFields(fieldsContas);
        }
      } else {

        try {
          const response = await api.get('/conta');
          if (response.data.length > 0) {
            const fieldsContas = response.data.map((user) => {
                
                return {
                  descricao: user.descricao,
                  valor: `R$${user.valor}`,
                  vecimento: formatDate(user.dt_vencimento),
                  pagamento: formatDate(user.dt_pagamento),
      
                  // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
                  handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
                
                };
            });
            setFields(fieldsContas);
          }
        } catch (e) {
          console.log(e);
          toast.error(`Erro ao renderizar tabela - ${e}`)
    
        } finally {
          setLoading(false);
        }
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
      let pg = false
      if (modalOpen.type === 'create') {

        let campos = true
        for (let verifica in data) {
          if (data[verifica] === '') {
            campos = false
          }
        }

        if (campos) {
          if (data.dt_pagamento === null) {
            data.dt_pagamento = 0
          };
          console.log(data)
          await api.post('/conta', data);

        } else {
          toast.error("É necessário preencher todos os campos!")
          todosCampos = false
        };

      } else if (modalOpen.type === 'edit') {

           await api.put(`/conta/${modalOpen.user.id_conta}`, data)

      } else if (modalOpen.type === 'delete') {
        await api.get(`/pagamento?id_conta=${modalOpen.user.id_conta}`).then( conta => {
          if (conta.data.length > 0) {
            toast.error("Há pagamentos vinculados com essa conta")
            pg = true
          } else {
            
            function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
          }
    
            async function demo() {
                  await sleep(3000);
                  console.log('Done');
            }
    
            demo().then(x => {
              const delConta = api.delete(`/conta/${modalOpen.user.id_conta}`).then(() => {
                getUsers();
                toggleModal();
              });
            });
          }
        });

      }
      if (todosCampos && !pg) {
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
      headers: ['Descricao', 'Valor', 'Vencimento', 'Pagamento', 'Editar', 'Excluir'],
    },
    {
      fields: fields,
    },
  ];

  return (
    <>
      <section className='section-data-table-contas'>
        {fields.length === 0 ? (
          <CustomLoading />
        ) : (
          <div style={{ width: '100%' }}>
            <div className="section-header-contas">
              <button
                className='btn btn-primary'
                onClick={() => handleCreateConta()}
              >   Adicionar Pagamento
                 </button>
              <form onSubmit={searchConta}>
                  <p>Vencimento de:</p>  
                  <input
                  type="date"
                   placeholder="Vencimento Inicial" name="search"
                    onChange={ ({target}) => setInicialDate(new Date(target.value).getTime() / 1000)}/>
                    <p>Até:</p>
                  <input   type="date"
                   placeholder="Vencimento Final" name="search"
                    onChange={ ({target}) => setFinalDate(new Date(target.value).getTime() / 1000)}/>
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
        <ModalContas
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
