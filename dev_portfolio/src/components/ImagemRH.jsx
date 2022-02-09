import React, { useState } from "react";
import RHpicture from '../resources/rhbarbearia.jpg'
import Button from '@mui/material/Button'
import TextField  from '@mui/material/TextField'
import {ImGooglePlus} from 'react-icons/im'
import * as yup from "yup"


const UserLogin = () => {

    const response = {
        "email": "",
        "password": ""
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
    e.preventDefault();
    response.email = email
    response.password = password

    console.log(response);
    };

    return(
    <>
    <section className="container_login">
        <div className="div_image">
            <img src={RHpicture} alt="Logotipo RH Barbearia" className="rh_image"/>
        </div>
        <div className="div_login">
            <h1 className="title">Fazer Login</h1>
            <form className="form" onSubmit={handleSubmit}>  

                <TextField 
                className="login_field" 
                label="Usuário" 
                margin="normal" 
                variant="filled" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} />

                <TextField 
                className="login_field" 
                label="Senha" margin="normal" 
                variant="filled" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} />

                <Button 
                type="Submit" 
                variant="contained" 
                color="primary" 
                className="login_button">Entrar</Button>

                <Button 
                type="submit" 
                variant="contained" 
                color="inherit" 
                className="google_button"><ImGooglePlus size="1.5rem"/><span>Entrar com Google</span></Button>

                <div className="auxiliar_buttons">
                    <Button variant="contained" >Primeiro Acesso</Button>
                    <Button variant="contained" >Esqueci a senha</Button>
                </div>
            </form>
        </div>
    </section> 
    </>
    )
};

export default UserLogin;
