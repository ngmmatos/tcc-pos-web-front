import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import '../scss/layout.scss';

export const Layout = ({ title, children}) => {
    return(
        <div className='container'>
            <Sidebar />
            <div className='content'>
                <Header title={title} />
                {children}
            </div>
        
        </div>
        
    );
}