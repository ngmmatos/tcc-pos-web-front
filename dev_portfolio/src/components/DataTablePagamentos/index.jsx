import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CustomLoading } from '../CustomLoading';
import { DataTableComponent } from '../DataTableComponent';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import ModalPagamentos from './ModalPagamentos';
import './styles.scss';
import { MdEdit, MdDelete } from 'react-icons/md';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import { toast } from 'react-toastify';
import { format, fromUnixTime} from 'date-fns';
import { AiOutlineSearch } from "react-icons/ai";

export const DataTablePagamento = () => {
  const [inicialDate, setInicialDate] = useState([]);
  const [finalDate, setFinalDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: '',
    user: null,
  });

  const pdfGnerator = () => {
    const doc = new jsPDF()
    autoTable(doc, { html: '#tableCustom' })
    doc.save('table.pdf')

  };

  const toggleModal = () => {
    setModalOpen({ isOpen: !modalOpen.isOpen, type: '' });
  };

  const handleCreateUser = () => {
    const data = {
      id_conta: '',
      id_adm: '',
      data_pagamento: null,
      valor: '',
      observacao: ''
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
      
      const response = await api.get('/pagamento');
      if (response.data.length > 0) {
        const fieldsPagamentos = response.data.map((user) => {
            
            return {
              conta: user.Contum.descricao,
              administrador: user.Administrador.Usuario.nome,
              data_pagamento: formatDate(user.data_pagamento),
              valor: `R$${user.valor}`,
  
              // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
              handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
            
            };
        });
        setFields(fieldsPagamentos);
      }
    } catch (e) {
      console.log(e);
      toast.error(`Erro ao renderizar tabela - ${e}`)

    } finally {
      setLoading(false);
    }
  }, []);

  const searchPagamento = async (e) => {
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

        const response = await api.get(`/pagamento?data_pagamento_maior=${inicialDate}&data_pagamento_menor=${finalDate}`);
        if (response.data.length > 0) {
          const fieldsPagamentos = response.data.map((user) => {
              
              return {
                conta: user.Contum.descricao,
                administrador: user.Administrador.Usuario.nome,
                data_pagamento: formatDate(user.data_pagamento),
                valor: `R$${user.valor}`,
    
                // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
                handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
              
              };
          });
          setFields(fieldsPagamentos);
        } else {
  
          const fieldsPagamentos = () => {
            return [{
              conta: "",
              administrador: "",
              data_pagamento: "",
              valor: "",
    
              // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
            
            }];
          }
          setFields(fieldsPagamentos);
        }
      } else {

        try {
          const response = await api.get('/pagamento');
          if (response.data.length > 0) {
            const fieldsPagamentos = response.data.map((user) => {
                
                return {
                  conta: user.Contum.descricao,
                  administrador: user.Administrador.Usuario.nome,
                  data_pagamento: formatDate(user.data_pagamento),
                  valor: `R$${user.valor}`,
      
                  // handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
                  handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
                
                };
            });
            setFields(fieldsPagamentos);
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
      let controle = true
      if (modalOpen.type === 'create') {


        let campos = true
        for (let verifica in data) {
          if (data[verifica] === '' && verifica !== 'observação') {
            console.log(data)
            campos = false
          }
        }

        if (campos) {

            data.valor = parseFloat((data.valor).replace(',','.'))
            const dt_pagamento = data.data_pagamento
            const postPagamento = api.post('/pagamento', data)
            const conta = api.put(`/conta/${data.id_conta}`, {"dt_pagamento": dt_pagamento})
 

        } else {
          toast.error("Campo observação é opcional. Os demais todos são obrigatórios!")
          todosCampos = false
        };

      } else if (modalOpen.type === 'edit') {
          const dt_pagamento = data.data_pagamento
          const putPagamento =  api.put(`/pagamento/${modalOpen.user.id_pagamento}`, data)
          const conta = api.put(`/conta/${data.id_conta}`, dt_pagamento)

      } else if (modalOpen.type === 'delete') {

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }

        async function demo() {
              await sleep(3000);
              console.log('Done');
        }
          
          demo().then(x => {
            const delUsuario = api.delete(`/pagamento/${modalOpen.user.id_pagamento}`).then(() => {
              const dt_pagamento = 0
              const conta = api.put(`/conta/${data.id_conta}`, {"dt_pagamento": dt_pagamento})
              getUsers();
              toggleModal();
            });
          });

      }
      if (todosCampos && controle) {
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
      headers: ['Conta', 'Administrador', 'Data Pagamento', 'Valor', 'Excluir'],
    },
    {
      fields: fields,
    },
  ];

  return (
    <>
      <section className='section-data-table-pagamento'>
        {fields.length === 0 ? (
          <CustomLoading />
        ) : (
          <div style={{ width: '100%' }}>
            <div className="section-header-pagamento">
              <button
                className='btn btn-primary'
                onClick={() => handleCreateUser()}
              >   Adicionar Pagamento
                 </button>
              <form onSubmit={searchPagamento}>
                  <p>De:</p>  
                  <input
                  type="date"
                   placeholder="Data Inicial" name="search"
                    onChange={ ({target}) => setInicialDate(new Date(target.value).getTime() / 1000)}/>
                    <p>Até:</p>
                  <input   type="date"
                   placeholder="Data Final" name="search"
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
        <ModalPagamentos
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
