/* eslint-disable no-unused-vars */
import React, { useState, useRef  } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import { FiMail } from 'react-icons/fi';
import barberSVG from '../../assets/barber.svg';
import './styles.scss';
import { useAuth } from "../../hooks/useAuth";

process.env.TZ = "America/Sao_Paulo";

export const SolicitaSenha = () => {

    const { sendEmail, loading } = useAuth();
    const [email, setEmail] = useState(false);
    const history = useHistory();

    const form = useRef();

    const sendSubmit = (e) => {
        e.preventDefault();
        sendEmail(email)
      };

    const setReturn = () => {
        setTimeout(() => {
            history.push('/'); 
        }, 10);
    }

    return(
    <>
        <section className="mainSection">
            <div className="registerContainer">
                <h1>Esqueceu a senha? Refaça aqui!</h1>
                <form ref={form} onSubmit={sendSubmit}>
                        <div className='inputContainer'>
                            <FiMail />
                            <div>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" onChange={ ({target}) => setEmail(target.value)}  required/>
                            </div>
                        </div>  
                    <button type="submit">{ loading ? <Loading /> : "Solicitar Senha"}</button>
                    <button onClick={setReturn}>Voltar para Login</button>
                </form>
            </div>
            <div className="imageRegisterContainer">
                <img src={barberSVG} alt="Imagem Barbeiro" />
            </div>
        </section>
    </>
    )
};
