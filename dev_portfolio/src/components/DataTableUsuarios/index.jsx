import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CustomLoading } from '../CustomLoading';
import { DataTableComponent } from '../DataTableComponent';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import ModalUsuarios from './ModalUsuarios';
import './styles.scss';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, fromUnixTime } from 'date-fns';
import { AiOutlineSearch } from "react-icons/ai";
const bcrypt = require('bcryptjs');

export const DataTableUser = () => {
  const [users, setUsers] = useState('');
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
      nome: '',
      email: '',
      telefone: '',
      data_nascimento: null,
      sexo: '',
      senha: '',
      barbeiro: false,
      adm: false,
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
      return format(fromUnixTime(date), 'dd/MM/yyyy');
    };

    try {
      
      const response = await api.get('/usuario');
      if (response.data.length > 0) {
        const fieldsUsers = response.data.map((user) => {
          
          let isBarber = 'Não'
          let isAdm = 'Não'

          if (user.Administrador !== null) {
            isAdm = 'Sim'
            user.adm = true
          } else {
            user.adm = false
          }
          if (user.Barbeiro !== null) {
            isBarber = 'Sim'
            user.barbeiro = true
          } else {
            user.barbeiro = false
          }
          return {
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            nascimento: formatDate(user.data_nascimento),
            barbeiro: isBarber,
            administrador: isAdm,

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

  const encryptPass = (e) => {
    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(e, salt);
    return passHash
  };


  const searchUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formatDate = (date) => {
      return format(fromUnixTime(date), 'dd/MM/yyyy');
    };

    try {
      
      const response = await api.get(`/usuario?nome=${users}`);
      if (response.data.length > 0) {
        const fieldsUsers = response.data.map((user) => {
          
          let isBarber = 'Não'
          let isAdm = 'Não'

          if (user.Administrador !== null) {
            isAdm = 'Sim'
            user.adm = true
          } else {
            user.adm = false
          }
          if (user.Barbeiro !== null) {
            isBarber = 'Sim'
            user.barbeiro = true
          } else {
            user.barbeiro = false
          }
          return {
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            nascimento: formatDate(user.data_nascimento),
            barbeiro: isBarber,
            administrador: isAdm,

            handleEdit: <MdEdit onClick={() => handleEditUser(user)} />,
            handleDelet: <MdDelete onClick={() => handleDeletUser(user)} />,
          };
        });
        setFields(fieldsUsers);
      } else {
  
        const fieldsContas = () => {
          return [{
            nome: '',
            email: '',
            telefone: '',
            nascimento: '',
            barbeiro: '',
            administrador: '',
  
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

    const hora = new Date(Date.now());
    const agora = (hora.getTime()/1000);

    setLoading(true);

    try {
      let controleBarbeiro = true
      let todosCampos = true
      let controleCliente = true
      let controleAgenda = true
      let controleSaida = true

      if (modalOpen.type === 'create') {

        let encryptData = data
        const senha = encryptPass(data.senha)
        encryptData.senha = senha

        let campos = true
        for (let verifica in encryptData) {
          if (encryptData[verifica] === '') {
            campos = false
          }
        }

        if (campos) {
          await api.post('/usuario', encryptData).then(usuario => {
            const createCliente = api.post('/cliente', {id_usuario: usuario.data.id_usuario})
            if (encryptData.adm) {
              const createAdm = api.post('/administrador', {id_usuario: usuario.data.id_usuario})
            }
            if (encryptData.barbeiro) {
              const createBarbeiro = api.post('/barbeiro', {id_usuario: usuario.data.id_usuario})
            }
            toast.success("Usuário criado com sucesso")
          });

   
        } else {
          toast.error("É necessário preencher todos os campos!")
          todosCampos = false
        };

      } else if (modalOpen.type === 'edit') {

        delete data['senha']

          const buscaUser = api.get(`/usuario?email=${modalOpen.user.email}`).then(usuario => {

            const buscaAgendamentos = 
            api.get(`/agendamento?id_barbeiro=${modalOpen.user.Barbeiro !== null ? modalOpen.user.Barbeiro.id_barbeiro : 0}`).then((agen) => {

              if (usuario.data[0].Administrador !== null){
                if (!data.adm) {
                  const createAdm = api.delete(`/administrador/${modalOpen.user.Administrador.id_adm}`);
                  toast.success("Administrador deletado com sucesso!")
                }
              } else {
                if (data.adm) {
                  const delAdministrador = api.post('/administrador', {id_usuario: usuario.data[0].id_usuario});
                  toast.success("Administrador incluído com sucesso!")
                }
              }
    
              if (usuario.data[0].Barbeiro !== null){
                if (!data.barbeiro) {
                  controleSaida = false

                  agen.data.map((item) => {
                    if (item.data_realizacao > agora) {
                      controleBarbeiro = false
                    }
                  });

                  const checkAgenda = async () => {
                    let check = true
                    const barbeiroAgenda = await api.get(`/agenda?id_barbeiro=${modalOpen.user.Barbeiro.id_barbeiro}&hr_inicio=${parseInt(agora)}`)
                    if (barbeiroAgenda.data.length > 0) {
                      check = false
                        }
                    console.log(check)
                    return check
                  }

                  checkAgenda().then((result) => {
                    controleAgenda = result
                    if (!controleBarbeiro) {
                      toast.error("Há agendamento futuro vinculado a esse barbeiro. O mesmo não pode ser excluído!");
                      return 0
                    } else if (!controleAgenda) {
                      toast.error("Há agenda vinculada a esse barbeiro. O mesmo não pode ser excluído!");
                      return 0
                    } else {
                      const createBarbeiro = api.delete(`/barbeiro/${modalOpen.user.Barbeiro.id_barbeiro}`);
                      toast.success("Barbeiro deletado com sucesso!")
                    }

                    if (controleBarbeiro && controleAgenda) {
                      api.put(`/usuario/${modalOpen.user.id_usuario}`, data)
                      toast.success("Dados alterados com sucesso!")
                    }
                  });
                }
              } else {
                if (data.barbeiro) {
                  const createBarbeiro = api.post('/barbeiro', {id_usuario: usuario.data[0].id_usuario});
                  toast.success("Barbeiro incluido com sucesso!")
                }
              }
              if (controleBarbeiro && controleSaida) {
                api.put(`/usuario/${modalOpen.user.id_usuario}`, data)
                toast.success("Dados alterados com sucesso!")
              }
              
            });
          });



      } else if (modalOpen.type === 'delete') {

        const getCleinte =  await api.get(`/cliente?id_usuario=${modalOpen.user.id_usuario}`);

          if (getCleinte.data.length > 0) {

            const clientesAgen = await api.get(`/agendamento?id_cliente=${getCleinte.data[0].id_cliente}&data_realizacao_maior=${parseInt(agora)}`)
            if (controleCliente && modalOpen.user.Barbeiro !== null) {

              const barbeiroAgen =  await api.get(`/agendamento?id_barbeiro=${modalOpen.user.Barbeiro.id_barbeiro}&data_realizacao_maior=${parseInt(agora)}`)
              const barbeiroAgenda =  await api.get(`/agenda?id_barbeiro=${modalOpen.user.Barbeiro.id_barbeiro}&hr_inicio=${parseInt(agora)}`)
              if (barbeiroAgen.data.length > 0) {
                controleBarbeiro = false
              }

              if (barbeiroAgenda.data.length > 0) {
                controleAgenda = false
              }
            }

            if (clientesAgen.data.length > 0) {
              controleCliente = false
            }
            if (!controleCliente) {
              toast.error("Há agendamento a ser relaizado vinculado a esse cliente, o mesmo não pode ser excluído")
            } else if (!controleBarbeiro) {
              toast.error("Há agendamento vinculado a esse barbeiro, o mesmo não pode ser excluído")
            } else if (!controleAgenda) {
              toast.error("Há agenda vinculada a esse barbeiro, o mesmo não pode ser excluído")
            } else {

              if (modalOpen.user.Barbeiro !== null) {
                  const delBarbeiro = api.delete(`/barbeiro/${modalOpen.user.Barbeiro.id_barbeiro}`);
              } 
  
              if (modalOpen.user.Administrador !== null) {
                const delAdministrador = api.delete(`/administrador/${modalOpen.user.Administrador.id_adm}`);
              }
              
                const delCliente = api.delete(`/cliente/${getCleinte.data[0].id_cliente}`);

                  function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
          
                  async function demo() {
                        await sleep(3000);
                        console.log('Done');
                  }
          
                  demo().then(x => {
  
                    const delUsuario = api.delete(`/usuario/${modalOpen.user.id_usuario}`).then(() => {
                      getUsers();
                      toggleModal();
                      toast.success("Usuário excluído com sucesso")
                      });
                    });

            }

                
          } else {
            toast.error("Não há cliente vnculado a esse usuário. Erro interno")
          }
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
      headers: ['Nome', 'Email', 'Telefone', 'Nascimento', 'Barbeiro', 'Administrador', 'Editar', 'Excluir'],
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
              >   Adicionar Cliente
                 </button>
              <form onSubmit={searchUser}>  
                  <input type="text" placeholder="Buscar por nome" name="search" onChange={ ({target}) => setUsers(target.value)}/>
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
