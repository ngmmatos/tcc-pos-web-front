import React from 'react';
import { SidebarCliente } from '../Sidebar/Cliente';
import { SidebarAdm } from '../Sidebar/Admin';
import { Header } from '../Header';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';


export const Layout = ({ title, children}) => {

    const { userSigned, signed } = useAuth();


    return(
        <div className='container'>
            {/* { userSigned?.roles?.includes('admin') ? <SidebarCliente /> : <SidebarAdm /> } */}
            <SidebarCliente />
            <div className='content'>
                {/* { console.log(userSigned)} */}
                <Header title={title} />
                {children}
            </div>
        
        </div>
        
    );
}