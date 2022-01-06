import React from "react";
import RHpicture from '../resources/rhbarbearia.jpg'

const UserLogin = () => {
    return(
    <>
    <div className='div_image'>
        <img src={RHpicture} alt="Logotipo RH Barbearia" className="rh_image"/>
    </div>
    <div className='div_login'>
        <h1 className="title">Fazer Login</h1>
        <form>  
            <label htmlFor='user'>Usuário</label>
            <input id='user' type='text' name='user'/>

            <label htmlFor="password">Senha</label>
            <input id='password' type='password' name='user'/>
 
            <button classname='login_button'>Entrar</button>
            <button type='submit' theme='contained-green' classname='login_button'>Primeiro Acesso</button>
            <button type='submit' theme='contained-green' classname='login_button'>Esqueci a senha</button>
            <button type='submit' theme='contained-green' classname='login_button'>Entrar com Google</button> 
        </form> 
    </div>
    </>
    )
};

export default UserLogin;
// export default () => 
//     <>
//     <div className='div_image'>
//         <img src={RHpicture} alt="Logotipo RH Barbearia" className="rh_image"/>
//         <h1>RH BARBEARIA</h1>
//     </div>
//     </>