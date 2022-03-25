import React from 'react';
import { SidebarCliente } from '../Sidebar/Cliente';
import { SidebarAdm } from '../Sidebar/Admin';
import { SidebarBarbeiro } from '../Sidebar/Barbeiro';
import { Header } from '../Header';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';


export const Layout = ({ title, children}) => {

    const { userSigned, signed } = useAuth();
    
    
    const choiceSideBar = () => {
        const adm = userSigned.roles.find( obj => 'admin' in obj );
        const barber = userSigned.roles.find( obj => 'barbeiro' in obj );
        
        if (adm !== undefined) {
            return <SidebarAdm />;
        } else if (barber !== undefined) {
            return <SidebarBarbeiro />
        } else {
            return <SidebarCliente /> 
        }
    }


    return(
        <div className='container'>
            <view>{choiceSideBar()}</view>
            <div className='content'>
                {/* { console.log(userSigned)} */}
                <Header title={title} />
                {children}
            </div>
        </div>
        
    );
}