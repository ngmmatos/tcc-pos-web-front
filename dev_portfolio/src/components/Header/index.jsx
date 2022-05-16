import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoMenu from '../../resources/logoMenu.png';
import './styles.scss';

export const Header = ({ title }) => {
  const { signout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    try {
      signout();
    } finally {
      history.push('/');
    }
  };
  return (
    <header className='headerContainer'>
      <img src={logoMenu} alt='Logotipo RH Barbearia' className='image-text' />
      <div>
        <h1>{title}</h1>
      </div>
      <button className='logoutButton' onClick={handleLogout}>
        <AiOutlineLogout />
      </button>
    </header>
  );
};
