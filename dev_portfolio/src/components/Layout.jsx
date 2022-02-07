import React from 'react';
import { SidebarAdm } from './SideBarAdm';
import { Sidebar } from './Sidebar';
import { SidebarBarbeiro } from './SidebarBarbeiro';
import { Header } from './Header';
import '../scss/layout.scss';

export const Layout = ({ title, children}) => {
    return(
        <div className='container'>
            <SidebarAdm />
            <div className='content'>
                <Header title={title} />
                {children}
            </div>
        
        </div>
        
    );
}