import React from "react";
import RHpicture from '../resources/rhbarbearia.jpg'
import '../scss/fonts/Risque-Regular.ttf'

const UserLogin = () => {
    return(
    <>
    <div className="div_image">
        <img src={RHpicture} alt="Logotipo RH Barbearia" className="rh_image"/>
    </div>
    <div className="div_login">
        <h1 className="title">Fazer Login</h1>
        <form className="form">  
            <label htmlFor="user">Usuário</label>
            <input id="user" type="text" name="user"/>

            <label htmlFor="password">Senha</label>
            <input id="password" type="password" name="user"/>
 
            <button type="submit" className="login_button">Entrar</button>
            <button type="submit" className="login_button_google" theme="contained-green">Entrar com Google</button>

            <div className='div_botoes_extras'>
                <button className="botoes_extras_1" type="submit" theme="contained-green" >Primeiro Acesso</button>
                <button className="botoes_extras_2" type="submit" theme="contained-green" >Esqueci a senha</button>
            </div>
        </form> 
    </div>
    </>
    )
};

export default UserLogin;
