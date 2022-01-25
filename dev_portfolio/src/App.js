import ImagemRH from './components/ImagemRH'
import { ThemeProvider } from '@mui/material/styles'
import theme from './components/Tema'

function App() {
  return (
    <div className="App">
          <ThemeProvider theme={theme}>
           <ImagemRH/>
          </ThemeProvider>
    </div>
  );
}

export default App;
