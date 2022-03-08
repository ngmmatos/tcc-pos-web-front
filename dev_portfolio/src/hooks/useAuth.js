import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext({});
const bcrypt = require('bcryptjs');
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
            console.log("111")
            setUserSigned(response.data);
            console.log("222")
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            console.log("333")
            cookies.set('barbearia', response.data, { 
                path: '/' ,
                expires: new Date(Date.now() + 3600 * 1000)
            });
            console.log("1444")

            setSigned(true);
            setLoading(false);

            if (redirect === true) {
              setTimeout(() => {
                  
              history.push('/geral');
              }, 800);
            }
            console.log("5555")
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
          });

        // try {

        //     signin(email, senha, false);

        // } catch(error) {
        //     console.log(error);
        //     toast.error("Erro ao gravar informações -"+ error)
        // }

        //   const user = await api.get('/usuario', {
        //     nome,
        //     email,
        //     senha,
        //     data_nascimento,
        //     telefone,
        //     sexo
        //   });
        //   console.log(user.data)

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
    return (
        <AuthContext.Provider value={{signin, signout, createUser, userSigned, signed, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}