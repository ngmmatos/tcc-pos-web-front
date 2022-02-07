import React from 'react';

import '../scss/header.scss';

export const Header = ({ title }) => {
    return(
        <header className='headerContainer'>
            <h1>{title}</h1>
        </header>
    );
}