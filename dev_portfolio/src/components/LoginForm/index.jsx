import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {ImGooglePlus} from 'react-icons/im'
import { FaUserAlt, FaLock, FaEyeSlash, FaEye  } from 'react-icons/fa'
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import { api } from "../../services/api";
import { GoogleLogin } from 'react-google-login'

import './styles.scss';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export const LoginForm = () => {
    
    
    const clientId = `${process.env.REACT_APP_GOOGLE}`;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    
    const { userSigned , signin, loading } = useAuth();
    
    const history = useHistory()

    const setNewPass = () => {
        setTimeout(() => {
            history.push('/solicitasenha'); 
            
        }, 100);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        // setLoading(true);

        try {

            signin(email, password, null);

        } catch(error) {
            console.log(error);
        }
    };


    const onSuccess = (res) => {

        signin(null, null, res.getAuthResponse().id_token);
    };

    const onFailure = (res) => {
        toast.error("Falha ao realizar login com Google")
    };

    return(
        <div className="loginSideContainer">
        <h1 className="title">Fazer Login</h1>
        <form className="form" onSubmit={handleSubmit}>  

            <div className='usernameInputContainer'>
                    <FaUserAlt />
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email"  onChange={ ({target}) => setEmail(target.value)} required/>
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

            <button type="submit" className="emailLoginButton">{loading ? <Loading /> : "Entrar"}</button>
            <GoogleLogin
            render = {renderProps => (
                <button type="button" className="googleLoginButton"
                onClick={renderProps.onClick} disabled={renderProps.disabled}
                ><ImGooglePlus size="1.5rem"/><span>{loading ? <Loading /> : "Entrar com Google"}</span></button>
            )}
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            />
           
            <div className="loginHelperContainer">
                <button className="firstAccess" onClick={() => { history.push("/cadastro") }}>Primeiro Acesso</button>
                <button onClick={setNewPass} >Esqueci a senha</button>
            </div>
        </form>
    </div>
    );
}