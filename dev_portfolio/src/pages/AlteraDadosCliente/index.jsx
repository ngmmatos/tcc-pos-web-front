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
const moment = require("moment");

process.env.TZ = "America/Sao_Paulo";


export function AlteraDadosCliente () {

    const cookies = new Cookies();
    const cookieLoaded = cookies.get('barbearia');

    const [ name, setName ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');
    const [ gender, setGender ] = useState('');
    const [ tel, setTel ] = useState('');
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const { alterUser , loading, searchUser } = useAuth();

    useEffect(() => {
        (async () => {
          const resp = await searchUser(cookieLoaded.user.id_usuario)
          setName(resp.nome)
          setBirthDate(resp.data_nascimento)
          setGender(resp.sexo)
          setTel(resp.telefone)
          setCurrentPassword(resp.senha)
        })()
      }, [])

    const nascimento = moment.unix(birthDate).add(1, 'd').format('DD/MM/yyy')

        
    function enableCreateUser() {
        setDisabled(!disabled);
        if (disabled) {
            document.getElementById("disable").classList.remove('disableSection')
        } else {
            document.getElementById("disable").classList.add('disableSection')
        }
    }


    function handleSubmit(event) {
        event.preventDefault();
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
    
        alterUser(name, tel, gender, birthDate, password, cookieLoaded.user.id_usuario, currentPassword);
    }

    return (
        <>
        <Layout title="Meus Dados">
            <section className="Section">
                <div className="registerContainer disableSection" id="disable">
                    <form onSubmit={handleSubmit}>
                        <div>    
                            <p>Alterar</p>
                            <label className="switch">
                                <input type="checkbox" id="check" name="check" onClick={enableCreateUser} />
                                <span className="slider round"></span>
                            </label>
                        </div>          
                            <div className='inputContainer inputMask'>
                                <FaUserAlt />
                                <div>
                                    <label htmlFor="email" >Nome Completo</label>
                                    <input type="text" id="nome" placeholder={name} onChange={ ({target}) => setName(target.value)} disabled={disabled}/>
                                </div>
                            </div>  
                            <div className='inputContainer email'>
                                <FiMail />
                                <div>
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" id="email" value={cookieLoaded.user.email} disabled/>
                                </div>
                            </div>  
                            <div className='inputContainer'>
                                <FaCalendarAlt />
                                <div>
                                    <label htmlFor="birthdate">Nascimento</label>
                                    <input type={disabled ? 'text' : 'date'} placeholder={nascimento} disabled={disabled}
                                    id="birthdate" max={moment().format("YYYY-MM-DD")}
                                    min={`${(moment().format("YYYY")-120)}-${moment().format("MM-DD")}`}
                                    onChange={ ({target}) => setBirthDate(new Date(target.value).getTime() / 1000)}/>
                                </div>
                            </div>   
                            <div className='selectContainer'>
                                <IoMaleFemale />
                                <div>
                                    <label htmlFor="email">Sexo</label>
                                    <select onChange={ ({target}) => setGender(target.value)} disabled={disabled}>
                                        <option>{gender === 'M' ? 'Masculino' : 'Feminino'}</option>
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
                                    name="Telefone"
                                    placeholder={tel}
                                    onChange={({target}) => setTel(target.value) }
                                    mask="(99)99999-9999"
                                    disabled={disabled}
                                    />
                                </div>
                            </div>  

                            <div className='passwordInputContainer'>
                                <FaLock />
                                <div>
                                    <label htmlFor="password">Senha</label>
                                    <input type={togglePassword ? 'text' : 'password'} id="password" minLength="6"
                                    onChange={ ({target}) => setPassword(target.value)} placeholder='******' disabled={disabled}/>
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
                                    onChange={ ({target}) => setConfirmPassword(target.value)} placeholder='******' disabled={disabled}/>
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

                            <button type="submit" disabled={disabled} 
                            className="emailLoginButton">{ loading ? <Loading /> : "Confirmar"}</button>
                    </form>
                </div>
            </section>
        </Layout>
        </>
    );
}