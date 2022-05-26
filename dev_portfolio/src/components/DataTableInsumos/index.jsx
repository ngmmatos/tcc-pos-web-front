import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CustomLoading } from '../CustomLoading';
import { DataTableComponent } from '../DataTableComponent';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import ModalInsumos from './ModalInsumos';
import './styles.scss';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from "react-icons/ai";

export const DataTableInsumo = () => {
  const [insumos, setInsumos] = useState('');
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
      insumo: '',
      id_fornecedor: '',
      estoque: '',
      ultimo_valor: ''
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
      
      const response = await api.get('/insumo');
      if (response.data.length > 0) {
        const fieldsInsumos = response.data.map((user) => {
            
            return {
              insumo: user.insumo,
              fornecedor: user.Fornecedor.fornecedor,
              estoque: user.estoque,
              ultimo_valor: `R$${user.ultimo_valor}`,
  
              handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
              handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
            
            };
        });
        setFields(fieldsInsumos);
      }
    } catch (e) {
      console.log(e);
      toast.error(`Erro ao renderizar tabela - ${e}`)

    } finally {
      setLoading(false);
    }
  }, []);

  const searchInsumos = async (e) => {
    e.preventDefault();

    setLoading(true);


    try {
      
      const response = await api.get(`/insumo?insumo=${insumos}`);
      if (response.data.length > 0) {
        const fieldsInsumos = response.data.map((user) => {
            
            return {
              insumo: user.insumo,
              fornecedor: user.Fornecedor.fornecedor,
              estoque: user.estoque,
              ultimo_valor: `R$${user.ultimo_valor}`,
  
              handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
              handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
            
            };
        });
        setFields(fieldsInsumos);
      } else {
  
        const fieldsContas = () => {
          return [{
            insumo: '',
            fornecedor: '',
            estoque: '',
            ultimo_valor: '',
  
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

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      let todosCampos = true
      let controle = true
      if (modalOpen.type === 'create') {


        let campos = true
        for (let verifica in data) {
          if (data[verifica] === '') {
            campos = false
          }
        }

        if (campos) {
          // await api.get(`/fornecedor?fornecedor=${data.fornecedor}`).then((forn) => {
          //   delete data['fornecedor']

          //   data['id_fornecedor'] = forn.id_fornecedor

            data.estoque = parseInt(data.estoque)
            data.ultimo_valor = parseFloat((data.ultimo_valor).replace(',','.'))
            const postInsumo =  api.post('/insumo', data)
          // });

        } else {
          toast.error("É necessário preencher todos os campos!")
          todosCampos = false
        };

      } else if (modalOpen.type === 'edit') {

        await api.get(`/fornecedor?fornecedor=${data.fornecedor}`).then((forn) => {
          delete data['fornecedor']

          data['id_fornecedor'] = forn.id_fornecedor

          const putInsumo =  api.put(`/insumo/${modalOpen.user.id_insumo}`, data)
        });


      } else if (modalOpen.type === 'delete') {

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }

        async function demo() {
              await sleep(3000);
              console.log('Done');
        }

        const insumoProcedimento = await api.get(`/insumoProcedimento?id_insumo=${modalOpen.user.id_insumo}`);
        if (insumoProcedimento.data.length == 0) {
          
          demo().then(x => {
            const delUsuario = api.delete(`/insumo/${modalOpen.user.id_insumo}`).then(() => {
              getUsers();
              toggleModal();
            });
          });
        } else {
          toast.error("Há procedimentos vinculados a esse insumo!")
          controle = false
        }

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
      headers: ['Insumo', 'Fornecedor', 'Estoque', 'Último Valor', 'Editar', 'Excluir'],
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
              >   Adicionar Insumo
                 </button>
              <form onSubmit={searchInsumos}>  
                  <input type="text" placeholder="Buscar por nome" name="search" onChange={ ({target}) => setInsumos(target.value)}/>
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
        <ModalInsumos
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
