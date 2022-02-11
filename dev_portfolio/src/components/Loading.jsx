import react from 'react';
import '../scss/Loading.scss';
import { FaSpinner } from 'react-icons/fa';

function Loading() {
  return (
    <div className="App">
          <FaSpinner icon="spinner" className="spinner" /> 
    </div>
  );
}

export default Loading;