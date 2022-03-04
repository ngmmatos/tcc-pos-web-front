/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import Loading from "../../components/Loading";
import { FaUserAlt, FaLock, FaEyeSlash, FaEye, FaCalendarAlt  } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import barberSVG from '../../assets/barber.svg';
import './styles.scss';
import { CustomSelect } from "../../components/CustomSelect";
import { useAuth } from "../../hooks/useAuth";

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

    const { createUser , loading } = useAuth();
    const history = useHistory();
    

    function handleSubmit(event) {
        
        event.preventDefault();
        createUser(name, email, password, birthDate, tel, gender );


    }

    return(
    <>
        <section className="mainSection">
            <div className="registerContainer">
                <h1>Faça seu cadastro</h1>
                <form onSubmit={handleSubmit}>
                        <div className='inputContainer'>
                            <FaUserAlt />
                            <div>
                                <label htmlFor="email">Nome Completo</label>
                                <input type="text" id="nome"  onChange={ ({target}) => setName(target.value)} required/>
                            </div>
                        </div>  
                        <div className='inputContainer'>
                            <FiMail />
                            <div>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email"  onChange={ ({target}) => setEmail(target.value)} required/>
                            </div>
                        </div>  
                        <div className='inputContainer'>
                            <FaCalendarAlt />
                            <div>
                                <label htmlFor="birthdate">Nascimento</label>
                                <input type="date" id="birthdate"  onChange={ ({target}) => setBirthDate(target.value)} required/>
                            </div>
                        </div>   
                        <div className='selectContainer'>
                            <FiMail />
                            <div>
                                <label htmlFor="email">Sexo</label>
                                <select onChange={ ({target}) => setGender(target.value)} required>
                                    <option value="">Selecione</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                        </div>  

                        <div className='inputContainer inputMask'>
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
                                <input type={togglePassword ? 'text' : 'password'} id="password" onChange={ ({target}) => setPassword(target.value)} required/>
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
                                <input type={toggleConfirmPassword ? 'text' : 'password'} id="confirmPassword" onChange={ ({target}) => setConfirmPassword(target.value)} />
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
