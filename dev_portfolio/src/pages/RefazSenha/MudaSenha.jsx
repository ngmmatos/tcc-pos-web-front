/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Loading from "../../components/Loading";
import { FaLock, FaEyeSlash, FaEye} from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BsFillKeyFill } from "react-icons/bs";
import barberSVG from '../../assets/barber.svg';
import './styles.scss';
import { useAuth } from "../../hooks/useAuth";

process.env.TZ = "America/Sao_Paulo";

export const MudaSenha = () => {

    const [ email, setEmail ] = useState('')
    const [ chave, setChave ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

    const { changePass, loading } = useAuth();

    function handleSubmit(event) {
        event.preventDefault();
        changePass(password, confirmPassword, email, chave);
    }

    return(
    <>
        <section className="mainSection">
            <div className="registerContainer">
                <h1>Crie uma nova senha</h1>
                <form onSubmit={handleSubmit}>
                        <div className='inputContainer'>
                            <FiMail />
                            <div>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" onChange={ ({target}) => setEmail(target.value)}  required/>
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <BsFillKeyFill />
                            <div>
                                <label>Chave</label>
                                <input type="text" id="chave" onChange={ ({target}) => setChave(target.value)}  required/>
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

                    <button type="submit">{ loading ? <Loading /> : "Alterar"}</button>
                </form>
            </div>
            <div className="imageRegisterContainer">
                <img src={barberSVG} alt="Imagem Barbeiro" />
            </div>
        </section>
    </>
    )
};
