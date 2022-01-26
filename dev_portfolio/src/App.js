import Cadastro from './components/Cadastro'
import { ThemeProvider } from '@mui/material/styles'
import theme from './components/Tema'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Cadastro/>
      </ThemeProvider>
    </div>
  );
}

export default App;
