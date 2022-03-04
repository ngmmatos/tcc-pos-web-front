import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { useAuth  } from '../../hooks/useAuth';

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
    }
    return(
        <header className='headerContainer'>
            <h1>{title}</h1>
            <button className='logoutButton' onClick={handleLogout}>
                <AiOutlineLogout />
            </button>
        </header>
    );
}