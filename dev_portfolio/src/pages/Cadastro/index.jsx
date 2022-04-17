/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from "../../components/Loading";
import { FaUserAlt, FaLock, FaEyeSlash, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { IoMaleFemale } from "react-icons/io5";
import { FiMail } from 'react-icons/fi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import barberSVG from '../../assets/barber.svg';
import './styles.scss';
import { CustomSelect } from "../../components/CustomSelect";
import { useAuth } from "../../hooks/useAuth";
import { Layout } from '../../components/Layout';
const moment = require("moment");

process.env.TZ = "America/Sao_Paulo";

export const Cadastro = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');
    const [ gender, setGender ] = useState('');
    const [ tel, setTel ] = useState('');
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

    const { createUser , loading, alterUser } = useAuth();
    const history = useHistory();
    const location = useLocation()
    const routerInfo = location.state

    console.log(routerInfo) 


    // const dateNow = moment().format("YYYY-MM-DD")
    // console.log(`${(moment().format("YYYY")-120)}-${moment().format("MM")}-${moment().format("DD")}`)
    

    function handleSubmit(event) {
        
        event.preventDefault();
        if (routerInfo.hasOwnProperty('cadastro') && !routerInfo.cadastro) {
            if (password !== '') {
                if (confirmPassword === ''){
                    toast.error("Preencha a confirmação de senha");
                    throw new Error("Preencha a confirmação de senha");
                }
                if (password !== confirmPassword) {
                    toast.error("Senhas diferentes!");
                    throw new Error("Senhas diferentes");
                }
            } else {
                if (confirmPassword !== ''){
                    toast.error("Preencha o campo senha ");
                    throw new Error("Preencha o campo senha");
                }
            }

            alterUser(routerInfo.nome, tel, gender, birthDate, password, routerInfo.id, password, routerInfo.data );

        }else {
        createUser(name, email, password, confirmPassword, birthDate, tel, gender);
        }
    }

    return(
    <>
        <section className="mainSection">
            <div className="registerContainer">
                <h1>{!routerInfo ? "Faça seu cadastro" : "Complete seu Cadastro"}</h1>
                <form onSubmit={handleSubmit}>
                    {(routerInfo.hasOwnProperty('cadastro') && !routerInfo.cadastro) ?
                        <div></div>
                        :
                        <div className='inputContainer inputMask'>
                            <FaUserAlt />
                            <div>
                                <label htmlFor="email">Nome Completo</label>
                                <input type="text" id="nome"  onChange={ ({target}) => setName(target.value)} required/>
                            </div>
                        </div>
                        }
                    {(routerInfo.hasOwnProperty('cadastro') && !routerInfo.cadastro) ?
                        <div></div>
                        :  
                        <div className='inputContainer'>
                            <FiMail />
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email"  onChange={ ({target}) => setEmail(target.value)} required/>
                            </div>
                        </div>
                        }  
                        <div className='inputContainer'>
                            <FaCalendarAlt />
                            <div>
                                <label htmlFor="birthdate">Nascimento</label>
                                <input type="date"
                                 id="birthdate" max={moment().format("YYYY-MM-DD")}
                                 min={`${(moment().format("YYYY")-120)}-${moment().format("MM-DD")}`}
                                  onChange={ ({target}) => setBirthDate(new Date(target.value).getTime() / 1000)} required/>
                            </div>
                        </div>   
                        <div className='selectContainer'>
                            <IoMaleFemale />
                            <div>
                                <label htmlFor="email">Sexo</label>
                                <select onChange={ ({target}) => setGender(target.value)} required>
                                    <option value="">Selecione</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                        </div>  

                        <div className='inputContainer'>
                            <BsFillTelephoneFill />
                            <div>
                                <label htmlFor="email">Telefone</label>
                                <InputMask 
                                className=""
                                placeholder="Celular" 
                                name="Telefone"
                                value={tel}
                                onChange={({target}) => setTel(target.value) }
                                mask="(99)99999-9999"
                                required
                                />
                            </div>
                        </div>  

                        <div className='passwordInputContainer'>
                            <FaLock />
                            <div>
                                <label htmlFor="password">Senha</label>
                                <input type={togglePassword ? 'text' : 'password'} id="password" minLength="6"
                                 onChange={ ({target}) => setPassword(target.value)} required/>
                            </div>
                            <button
                                type="button"
                                className="showPasswordButton"
                                tabIndex={-1}
                                onClick={() => { setTogglePassword(!togglePassword)}}
                                style={{ top: 0 }}
                            >
                                {togglePassword ? (
                                <FaEyeSlash size={22} color="white" />
                                ) : (
                                <FaEye size={22} color="white" />
                                )}
                            </button>
                            
                        </div>
                        <div className='passwordInputContainer'>
                            <FaLock />
                            <div>
                                <label htmlFor="confirmPassword">Confirme a senha</label>
                                <input type={toggleConfirmPassword ? 'text' : 'password'} id="confirmPassword" minLength="6"
                                 onChange={ ({target}) => setConfirmPassword(target.value)} required/>
                            </div>
                            <button
                                type="button"
                                className="showPasswordButton"
                                tabIndex={-1}
                                onClick={() => { setToggleConfirmPassword(!toggleConfirmPassword)}}
                                style={{ top: 0 }}
                            >
                                {toggleConfirmPassword ? (
                                <FaEyeSlash size={22} color="white" />
                                ) : (
                                <FaEye size={22} color="white" />
                                )}
                            </button>
                            
                        </div>

                    <button type="submit">{ loading ? <Loading /> : "Cadastrar"}</button>
                </form>
            </div>
            <div className="imageRegisterContainer">
                <img src={barberSVG} alt="Imagem Barbeiro" />
            </div>
        </section>
    </>
    )
};
