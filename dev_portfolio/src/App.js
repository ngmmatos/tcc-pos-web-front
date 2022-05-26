import React from 'react';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import { ProcedureProvider } from './hooks/useProcedures'
import 'react-toastify/dist/ReactToastify.css';
import "./styles/global.scss";

import { Routes } from './routes';
import { AuthContextProvider } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthContextProvider>
        <ProcedureProvider>
            <Routes />
          <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                // theme="dark"
                />
        </ProcedureProvider>
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
