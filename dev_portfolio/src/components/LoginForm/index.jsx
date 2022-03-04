import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {ImGooglePlus} from 'react-icons/im'
import { FaUserAlt, FaLock, FaEyeSlash, FaEye  } from 'react-icons/fa'
import Loading from '../Loading';
import { api } from "../../services/api";

import './styles.scss';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);

    const { userSigned , signin, loading } = useAuth();

    const history = useHistory()

    const handleSubmit = (event) => {

        event.preventDefault();
        // setLoading(true);

        try {

            signin(email, password);

            // setTimeout(() => {
            //     history.push('/geral'); 
                
            // }, 1500);

        } catch(error) {
            console.log(error);
        }
    };

    return(
        <div className="loginSideContainer">
        <h1 className="title">Fazer Login</h1>
        <form className="form" onSubmit={handleSubmit}>  

            {/* <input type="email" placeholder="Email" value={email} onChange={ ({ target }) => setEmail(target.value)}/>
            <input type="text" placeholder="Senha" value={password} onChange={ ({ target }) => setPassword(target.value)}/> */}

            <div className='usernameInputContainer'>
                    <FaUserAlt />
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email"  onChange={ ({target}) => setEmail(target.value)}/>
                    </div>
            </div>            


            <div className='passwordInputContainer'>
                    <FaLock />
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input type={togglePassword ? 'text' : 'password'} id="password" onChange={ ({target}) => setPassword(target.value)}/>
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

            <button type="submit" className="emailLoginButton">{loading ? <Loading /> : "Entrar"}</button>
            <button type="submit" className="googleLoginButton"><ImGooglePlus size="1.5rem"/><span>Entrar com Google</span></button>
           
            <div className="loginHelperContainer">
                <button className="firstAccess" onClick={() => { history.push("/cadastro") }}>Primeiro Acesso</button>
                <button >Esqueci a senha</button>
            </div>
        </form>
    </div>
    );
}