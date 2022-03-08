import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthRoute } from './AuthRoutes';
import {Cadastro} from '../pages/Cadastro';
import  { Login } from '../pages/Login';
import { General } from '../pages/General';

export const Routes = () => {
    return(
        <Switch>
            {/* ROTAS GERAIS*/ }
            <Route exact path="/" component={Login} />
            <AuthRoute exact path="/geral" component={General} isPrivate/>
            <Route exact path="/cadastro" component={Cadastro} />
        </Switch>
    );
}