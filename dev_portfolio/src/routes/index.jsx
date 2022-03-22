import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthRoute } from './AuthRoutes';
import {Cadastro} from '../pages/Cadastro';
import  { Login } from '../pages/Login';
import { General } from '../pages/General';
import { Agenda } from '../pages/Agenda';
import { RHbarbearia } from '../pages/RHbarbearia';
import { AlteraDadosCliente } from '../pages/AlteraDadosCliente';

export const Routes = () => {
    return(
        <Switch>
            {/* ROTAS GERAIS*/ }
            <Route exact path="/" component={Login} />
            <AuthRoute exact path="/geral" component={General} isPrivate/>
            <AuthRoute exact path="/agenda" component={Agenda} isPrivate/>
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/rhbarbearia" component={RHbarbearia} />
            <Route exact path="/alteracliente" component={AlteraDadosCliente} />
        </Switch>
    );
}