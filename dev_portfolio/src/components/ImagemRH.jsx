import React, { useEffect, useState } from "react";
import RHpicture from '../resources/rhbarbearia.jpg'
import Button from '@mui/material/Button'
import TextField  from '@mui/material/TextField'
import {ImGooglePlus} from 'react-icons/im'
import Loading from './Loading';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from "yup"
import Axios from "axios"
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInState, setLoggedInState] = useState('');
    const [values, setValues] = useState({showPassword: false});

    const history = useHistory()

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    const handleSubmit = (values) => {
        values.preventDefault();
        setLoggedInState("Fazendo login")
        // console.log(process.env.URLBASE+"login")
        Axios.post("http://rhbarbeariaapi.herokuapp.com/RhBarbearia/login", {
            email: email,
            senha: password
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                // storeUser(response.data)
                history.push("/carrosel");
              }
              }).catch((err) => {
            setLoggedInState("")
            toast.error("Senha ou usuário incorreto")
        });
        };

    return(
    <>
    <section className="container_login">
        <ToastContainer theme="dark"/>
        <div className="div_image">
            <img src={RHpicture} alt="Logotipo RH Barbearia" className="rh_image"/>
        </div>
        <div className="div_login">
            <h1 className="title">Fazer Login</h1>
            <form className="form" onSubmit={handleSubmit}>  

                <TextField 
                className="login_field" 
                label="Email" 
                margin="normal" 
                variant="filled" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)} />

                {/* <TextField 
                className="login_field" 
                label="Senha" margin="normal" 
                variant="filled" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} /> */}

                <FormControl variant="filled" className="login_field" margin="normal">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>


                <Button 
                type="Submit" 
                variant="contained" 
                color="primary"
                startIcon={loggedInState === "Fazendo login" ? <Loading /> : ""}
                className="login_button">Entrar</Button>

                <Button  
                variant="contained" 
                color="inherit" 
                className="google_button"><ImGooglePlus size="1.5rem"/><span>Entrar com Google</span></Button>

                <div className="auxiliar_buttons">
                    <Button variant="contained" onClick={() => { history.push("/cadastro"); }}>Primeiro Acesso</Button>
                    <Button variant="contained" >Esqueci a senha</Button>
                </div>
            </form>
        </div>
    </section> 
    </>
    )
};

export default UserLogin;
