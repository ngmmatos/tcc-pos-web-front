import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser'


const bcrypt = require('bcryptjs');
const AuthContext = createContext({});
const cookies = new Cookies();

export const AuthContextProvider = ({ children }) => {

    const [ signed, setSigned ] = useState(false);
    const [ userSigned, setUserSigned ] = useState(undefined);
    const [ loading, setLoading ] = useState(false);

    const history = useHistory();

    useEffect(() => {
        loadUserFromCookie();
      }, []);



    async function signin(email, password, redirect = true)  {

        setLoading(true);

        try {
            const response = await api.post('/login', {
                email,
                senha: password
            });

            setUserSigned(response.data);

            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            cookies.set('barbearia', response.data, { 
                path: '/' ,
                expires: new Date(Date.now() + 3600 * 1000)
            });


            setSigned(true);
            setLoading(false);

            if (redirect === true) {
              setTimeout(() => {
                  
              history.push('/geral');
              }, 800);
            }
          } catch (error) {
              setLoading(false);
              toast.error('Usuário ou senha incorretos');
          }
         
    }

    const signout = async () => {
        try {
            //SE EXISTIR ROTA DE LOGOUT
            await api.get('/logout');
            
        } catch(error){
            console.log(error);
        } finally {
            setSigned(false);
            setUserSigned(undefined);
            cookies.remove('barbearia');
            api.defaults.headers.common['Authorization'] = '';
            history.pushState('/');
        }
    }

    const loadUserFromCookie = useCallback(async () => {
        setLoading(true);
        const cookieLoaded = cookies.get('barbearia');
    
        if (cookieLoaded) {
          const tokenExpirationDate = cookieLoaded.expired_at;
          //   const tokenExpirationDate = new Date(cookieLoaded.expired_at);
          const date = new Date();
    
          if (tokenExpirationDate > date.getTime()) {
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${cookieLoaded.token}`;
            setUserSigned(cookieLoaded);
    
            setTimeout(() => {
              setSigned(true);
              setLoading(false);
              history.push('/geral');
            }, 900);
          } else {
            console.error('Token inválido!');
            cookies.remove('barbearia');
          }
        } else {
          setLoading(false);
        }
      }, [cookies, history]);

    function hasPermission() {

    }


    //     // try {

    //     //     signin(email, senha, false);

    //     // } catch(error) {
    //     //     console.log(error);
    //     //     toast.error("Erro ao gravar informações -"+ error)
    //     // }

    //     //   const user = await api.get('/usuario', {
    //     //     nome,
    //     //     email,
    //     //     senha,
    //     //     data_nascimento,
    //     //     telefone,
    //     //     sexo
    //     //   });
    //     //   console.log(user.data)

    //       setLoading(false);
    //       toast.success('Usuário cadastrado com sucesso!');
    //       setTimeout(() => {
    //         history.push('/');
    //       }, 1000);
          
    //     } catch (error) {
    //       toast.error(error);
    //       setLoading(false);
    //       // history.push('/');
    //     }
    //   }
    // }

    const createUser = async(nome, email,senha, confirma_senha, data_nascimento,telefone, sexo ) => {

      if(senha !== confirma_senha) {
        toast.error("Senhas diferentes!");
      } else {
        try {
          setLoading(true);

          const salt = bcrypt.genSaltSync(10);
          const passHash = bcrypt.hashSync(senha, salt);  
          senha = passHash

          await api.post('/usuario', {
            nome,
            email,
            senha,
            data_nascimento,
            telefone,
            sexo
          }).then((response) => {

            const createClient = async(id_usuario) => {
              try {

                await api.post('/cliente', {
                  id_usuario
                });

              } catch (error) {
                toast.error(`Erro na criação de cliente - ${error}` );
                setLoading(false);
              }
            };

          const id_usuario = response.data.id_usuario
          createClient(id_usuario)

          }, (error) => {
            toast.error(`Erro na criação de usuario - ${error}` );
          })

          setLoading(false);
          toast.success('Usuário cadastrado com sucesso!');
          setTimeout(() => {
            history.push('/');
          }, 1000);
          
        } catch (error) {
          toast.error(error);
          console.log(error)
          setLoading(false);
          // history.push('/');
        }
      }
    }

    const alterUser = async(nome, telefone, sexo, data_nascimento, senha, user, currentPass) => {
      setLoading(true);
      let alter = false      
      if (senha !== '') {
        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(senha, salt);  
        senha = passHash
      } else {
        if(currentPass === ''){
          setLoading(false);
          toast.error('Erro processando a requisição!');
        } else{
          senha = currentPass
        }
      }

      try {
      await api.put(`/usuario/${user}`, {
        nome,
        data_nascimento,
        telefone,
        sexo,
        senha
        }).then(() => {

        setLoading(false);
        toast.success('Dados alterados com sucesso!');
        alter = true
      }, (error) => {
        setLoading(false);
        toast.error(`Erro na alteração de dados dousuário - ${error}` );
      })
        
      } catch (error) {
        toast.error(error);
        console.log(error)
        setLoading(false);
      };

      if (alter === true) {
      setTimeout(() => {
        history.push('/geral');
      }, 1000);
      }
    }


    const searchUser = async (id) => {

        try{
          const { data } = await api.get(`/usuario/${id}`)
          return data
          
        } catch (error) {
          toast.error(error);
          setLoading(false);
        };
    }

    async function deleteScheduler(id) {

      const id_agendamento = id
      var soma_tempo = 0

      await api.get('/procedimentoAgendamento', {
        params: {
          id_agendamento: id_agendamento
        }
      }).then(resp => {
        if (resp.status === 200) {
          
          const id_agenda = resp.data[0].Agendamento.Agenda.id_agenda;
          const hr_inicio_atual = resp.data[0].Agendamento.Agenda.hr_inicio;
          const minutos_disponiveis_atual = resp.data[0].Agendamento.Agenda.minutos_disponiveis;

          const deletaAgendaProc = resp.data.map( scheduler => {

            soma_tempo = (scheduler.Procedimento.tempo_medio) + soma_tempo
    
            try {
              const deleteAP = api.delete(`/procedimentoAgendamento/${scheduler.id_procedimento_agendamento}`);
              
            } catch (error) {
              toast.error(`Erro ao excluir agendamento - ${error}`);
              throw new Error("Erro ao excluir agendamento");
            }
          });
          
          const agendado = false
          const hr_inicio = hr_inicio_atual - (soma_tempo * 60)
          const minutos_disponiveis = minutos_disponiveis_atual + soma_tempo

          try {
            const alteraAgenda = api.put(`/agenda/${id_agenda}`, {
              hr_inicio,
              agendado,
              minutos_disponiveis
                });
              } catch (error) {
                toast.error(`Erro retornar a disponibilidade da agenda - ${error}`);
                throw new Error("Erro retornar a disponibilidade da agenda");
              }
            };
          });
      
      try {
          await api.delete(`/agendamento/${id}`);
          setLoading(false);
          toast.success('Agendamento removido com sucesso');
          setTimeout(() => {
            history.push('/geral');
            history.push('/meusagendamentos');
          }, 1000);
      } catch (error) {
        setLoading(false);
        toast.error(`Erro ao excluir agendamento - ${error}`);
      }
  }

  const sendEmail = async (email) => {
    setLoading(true);
    await api.get(`/usuario?email=${email}`, {
      auth: {
        username: process.env.REACT_APP_API_USER,
        password: process.env.REACT_APP_API_PASS
      }
    }).then((resp) => {

      if (resp.status === 200 && (resp.data).length !== 0) {

        const key = Math.random().toString(36).slice(-10);
        const hora = new Date(Date.now());
        const agora = hora.getTime()

        var templateParams = {
          // restoreLink: "http://localhost:3000/mudasenha", 
          restoreLink: "https://tcc-pos-web-front.vercel.app/mudasenha",
          to_email: email,
          key: key
        };
        try {
            const alteraDados = api.put(`/usuario/${resp.data[0].id_usuario}`, {
              token_senha: key,
              dt_token_senha: agora,
              },{
                 auth: {
                username: process.env.REACT_APP_API_USER,
                password: process.env.REACT_APP_API_PASS
              }
            }).then((resp2) => {
              if (resp2.status === 200) {

                console.log("informações gravadas")
              } else {
                  toast.error(`Erro na configuração para envio de email - ${resp2.status}` );
                  setLoading(false);
                  return false;
              }
            });
            
          } catch (error) {
            toast.error(`Erro na configuração para envio de email - ${error}`);
            setLoading(false);
            return false
          };
        
        emailjs.send(process.env.REACT_APP_SERVICE_EMAIL,
          process.env.REACT_APP_TEMPLATE_EMAIL,
          templateParams,
          process.env.REACT_APP_USER_EMAIL)
          .then((result) => {

            console.log(result.text);
            toast.success("Email enviado com sucesso!")
            setLoading(false);
            setTimeout(() => {

              history.push('/'); 
          }, 1000);
            return true
          }, (error) => {
            console.log(error);
            toast.error("Falha ao enviar email")
            setLoading(false);
            return false
          });

      } else {
        toast.error(`Este email não esta cadastrado!`);
        setLoading(false);
        return false
      };

    })

}

  const changePass = (senha, confirma_senha, email, chave) => {
    setLoading(true);

    if(senha !== confirma_senha) {
      toast.error("Senhas diferentes!");
      setLoading(false);
      return false
    } else {
      
      const buscaUser = api.get(`/recuperaSenha`, {
        params: {
          email: email,
          token_senha: chave
      },
        auth: {
          username: process.env.REACT_APP_API_USER,
          password: process.env.REACT_APP_API_PASS
          
        }
      }).then((resp) => {
        if (resp.status === 200 && (resp.data).length !== 0) {

          const hora = new Date(Date.now());
          const agora = hora.getTime()

          if ((agora - resp.data.dt_token_senha) >= 3600000 ) {
            toast.error("Tempo excedido. Favor solicite uma nova chave por email ");
            setLoading(false);
            return false
          }

          const salt = bcrypt.genSaltSync(10);
          const passHash = bcrypt.hashSync(senha, salt);  
          senha = passHash

          try {
            const alteraDados = api.put(`/usuario/${resp.data.id_usuario}`, {
              token_senha: null,
              dt_token_senha: null,
              senha: senha
              },{
                 auth: {
                username: process.env.REACT_APP_API_USER,
                password: process.env.REACT_APP_API_PASS
              }
            }).then((resp2) => {
              if (resp2.status === 200) {
                toast.success("Senha alterada com sucesso!")
                setLoading(false);
                setTimeout(() => {
                  history.push('/'); 
              }, 1000);
              } else {
                  toast.error(`Erro na configuração para envio de email - ${resp2.status}` );
                  setLoading(false);
                  return false;
              }
            });
            
          } catch (error) {
            toast.error(`Erro na configuração para envio de email - ${error}`);
            setLoading(false);
            return false
          };
        } else {
          toast.error(`Email ou chave incorretos!`);
          setLoading(false);
          return false
        }
      });
    }
  }

    return (
        <AuthContext.Provider value={{signin, signout, createUser,changePass,
         alterUser, searchUser, deleteScheduler, sendEmail, userSigned, signed, loading}}>
            {children}
        </AuthContext.Provider> 
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}

