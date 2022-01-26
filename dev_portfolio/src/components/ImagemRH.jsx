import React from "react";
import RHpicture from '../resources/rhbarbearia.jpg'
import Button from '@mui/material/Button'
import TextField  from '@mui/material/TextField'
import {ImGooglePlus} from 'react-icons/im'


const UserLogin = () => {
    return(
    <>
    <section className="container_login">
        <div className="div_image">
            <img src={RHpicture} alt="Logotipo RH Barbearia" className="rh_image"/>
        </div>
        <div className="div_login">
            <h1 className="title">Fazer Login</h1>
            <form className="form">  

                <TextField className="login_field" label="Usuário" margin="normal" variant="filled"/>
                <TextField className="login_field" label="Senha" margin="normal" variant="filled"/>

                <Button variant="contained" color="primary" className="login_button">Entrar</Button>

                <Button variant="contained" color="inherit" className="google_button"><ImGooglePlus size="1.5rem"/><span>Entrar com Google</span></Button>
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
