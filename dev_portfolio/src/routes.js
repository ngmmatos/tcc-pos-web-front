import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Agenda } from './components/Agenda';
import Cadastro from './components/Cadastro';
import ImagemRH from './components/ImagemRH';
import { Carrosel } from './components/Carrosel';
import { Calendario } from './components/Calendario';
import { Layout } from './components/Layout';

export const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ImagemRH} />
                <Route exact path="/cadastro/" component={Cadastro} />
                {/* <Route exact path="/layout" component={Layout} /> */}
                {/* <Route exact path="/agenda" component={Agenda} /> */}
                <Route exact path="/calendario" component={Calendario} />
                <Route exact path="/carrosel" component={Carrosel} />
            </Switch>
        </BrowserRouter>
    );
}