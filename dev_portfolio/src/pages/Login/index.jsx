import React from "react";
import { LoginForm } from "../../components/LoginForm";
import RHpicture from '../../resources/rhbarbearia.jpg'
import { useAuth } from "../../hooks/useAuth";

import './styles.scss';

export const Login = () => {
    const { userSigned } = useAuth();
    return(
    <>
    <section className="loginContainer">
        {/* { console.log(userSigned)} */}
        <div className="imageSideContainer">
            <img src={RHpicture} alt="Logotipo RH Barbearia"/>
        </div>
        <LoginForm />
      
    </section> 
    </>
    )
};
