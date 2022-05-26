import react from 'react';
import { FaSpinner } from 'react-icons/fa';
import './styles.scss';

function Loading() {
  return (
    <div className="spinner">
          <FaSpinner icon="spinner" /> 
    </div>
  );
}

export default Loading;