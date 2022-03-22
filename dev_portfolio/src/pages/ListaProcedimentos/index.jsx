/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Layout } from '../../components/Layout';
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import Loading from "../../components/Loading";
import { FaUserAlt, FaLock, FaEyeSlash, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { IoMaleFemale } from "react-icons/io5";
import { FiMail } from 'react-icons/fi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import './styles.scss';
import { CustomSelect } from "../../components/CustomSelect";
import { useAuth } from "../../hooks/useAuth";
import Cookies from 'universal-cookie';
import { useProcedures } from '../../hooks/useProcedures';

const moment = require("moment");


process.env.TZ = "America/Sao_Paulo";


export function ListaProcedimentos () {


    const { 
        getProcedureList , 
        procedureList
     } = useProcedures();

    useEffect(() => {
        getProcedureList();
    }, []);

    useEffect(() => {} , [procedureList]);

    // const cookies = new Cookies();
    // const cookieLoaded = cookies.get('barbearia');

    // const [ name, setName ] = useState('');
    // const [ birthDate, setBirthDate ] = useState('');
    // const [ gender, setGender ] = useState('');
    // const [ tel, setTel ] = useState('');
    // const [ password, setPassword ] = useState('')
    // const [ confirmPassword, setConfirmPassword ] = useState('');
    // const [ currentPassword, setCurrentPassword ] = useState('');
    // const [togglePassword, setTogglePassword] = useState(false);
    // const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
    // const [disabled, setDisabled] = useState(true);

    // const { alterUser , loading, searchUser } = useAuth();

    // useEffect(() => {
    //     (async () => {
    //       const resp = await searchUser(cookieLoaded.user.id_usuario)
    //       setName(resp.nome)
    //       setBirthDate(resp.data_nascimento)
    //       setGender(resp.sexo)
    //       setTel(resp.telefone)
    //       setCurrentPassword(resp.senha)
    //     })()
    //   }, [])

    // const nascimento = moment.unix(birthDate).add(1, 'd').format('DD/MM/yyy')

        
    // function enableCreateUser() {
    //     setDisabled(!disabled);
    //     if (disabled) {
    //         document.getElementById("disable").classList.remove('disableSection')
    //     } else {
    //         document.getElementById("disable").classList.add('disableSection')
    //     }
    // }


    // function handleSubmit(event) {
    //     event.preventDefault();
    //     if (password !== '') {
    //         if (confirmPassword === ''){
    //             toast.error("Preencha a confirmação de senha");
    //             throw new Error("Preencha a confirmação de senha");
    //         }
    //         if (password !== confirmPassword) {
    //             toast.error("Senhas diferentes!");
    //             throw new Error("Senhas diferentes");
    //         }
    //     } else {
    //         if (confirmPassword !== ''){
    //             toast.error("Preencha o campo senha ");
    //             throw new Error("Preencha o campo senha");
    //         }
    //     }
    
    //     alterUser(name, tel, gender, birthDate, password, cookieLoaded.user.id_usuario, currentPassword);
    // }

    return (
        <>
        <Layout title="Meus Dados">
            <div className='procedureModalContent'>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Procedimentos</th>
                    <th>Valor</th>
                    <th>Tempo médio (min)</th>
                </tr>
                </thead>
                <tbody>
                {procedureList.map(procedure => (
                    <tr key={procedure.id_procedimento}>
                    <td>{procedure.procedimento}</td>
                    <td>R$ {procedure.valor},00</td>
                    <td>{procedure.tempo_medio}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>   
        </Layout> 
        </>
    );
}