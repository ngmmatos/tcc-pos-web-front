import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from './AuthRoutes';
import { Cadastro } from '../pages/Cadastro';
import { Login } from '../pages/Login';
import { General } from '../pages/General';
import { Agenda } from '../pages/Agenda';
import { CalendarScheduler } from '../pages/Agenda/CalendarScheduler';
import { RHbarbearia } from '../pages/RHbarbearia';
import { AlteraDadosCliente } from '../pages/AlteraDadosCliente';
import { ListaProcedimentos } from '../pages/ListaProcedimentos';
import { MeusAgendamentos } from '../pages/MeusAgendamentos';
import { SolicitaSenha } from '../pages/RefazSenha/SolicitaSenha';
import { MudaSenha } from '../pages/RefazSenha/MudaSenha';

export const Routes = () => {
    return (
        <Switch>
            {/* ROTAS GERAIS*/}
            <Route exact path="/" component={Login} />
            <AuthRoute exact path="/geral" component={General} isPrivate />
            <AuthRoute exact path="/agenda" component={Agenda} isPrivate />
            <AuthRoute exact path="/agenda-calendar" component={CalendarScheduler} isPrivate />
            <Route exact path="/cadastro" component={Cadastro} />
            <AuthRoute exact path="/rhbarbearia" component={RHbarbearia} />
            <AuthRoute exact path="/alteracliente" component={AlteraDadosCliente} />
            <AuthRoute exact path="/listaprocedimento" component={ListaProcedimentos} />
            <AuthRoute exact path="/meusagendamentos" component={MeusAgendamentos} />
            <Route exact path="/solicitasenha" component={SolicitaSenha} />
            <Route exact path="/mudasenha" component={MudaSenha} />
        </Switch>
    );
}