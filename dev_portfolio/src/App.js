import { ThemeProvider } from '@mui/material/styles'
import theme from './components/Tema'
import "./styles/global.scss";

import { Layout } from './components/Layout';
import { Routes } from './routes';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
