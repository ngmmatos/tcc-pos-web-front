import React from "react";
import Button from '@mui/material/Button'
import TextField  from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';


const Cadastro = () => {
    return(
    <>
        <section className="container_cadastro">
            <div className="div_cadastro">  
            <h1 className="title_cadastro">Faça seu cadastro</h1>
                <div className="cadastro">
                    
                    <div className="cadastro_1">
                        <TextField className="cadastro_field" label="Nome" margin="normal" variant="filled" required/>
                        <TextField className="cadastro_field" label="Email" margin="normal" variant="filled" required/>
                        <TextField className="cadastro_field" label="CPF" margin="normal" variant="filled" required/>
                        <TextField className="cadastro_field" label="Data de nascimento" margin="normal" variant="filled" required/>                    
                    </div>
                    <div className="cadastro_2">
                        <InputLabel  className="escolhe_sexo_index"variant="standard" >Sexo</InputLabel>
                        <NativeSelect className="escolhe_sexo" defaultValue={'M'}>
                            <option value={'M'}>Masculino</option>
                            <option value={'F'}>Feminino</option>
                        </NativeSelect>

                        <TextField className="cadastro_field" label="Senha" margin="normal" variant="filled" required/>
                        <TextField className="cadastro_field" label="Confirme sua senha" margin="normal" variant="filled"required/>
                        <Button variant="contained" color="primary" className="salvar_button">Salvar</Button>
                    </div>
                    
                </div>  
            </div>
        </section>
    </>
    )
};

export default Cadastro;
