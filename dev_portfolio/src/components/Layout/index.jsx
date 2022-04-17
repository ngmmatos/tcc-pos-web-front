import React from 'react'
import { SidebarCliente } from '../Sidebar/Cliente';
import { SidebarAdm } from '../Sidebar/Admin';
import { SidebarBarbeiro } from '../Sidebar/Barbeiro';
import { Header } from '../Header';
import { useAuth } from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.scss';


export const Layout = ({ title, children}) => {

    const { userSigned, signed } = useAuth();
    const history = useHistory();
    const location = useLocation()
    const routerInfo = location.state


    const choiceSideBar = () => {

        if (routerInfo !== undefined) {
            if (routerInfo === 'adm') {
                return <SidebarAdm />;        
            } else if (routerInfo === 'barbeiro') {
                return <SidebarBarbeiro />
            } else {
                return <SidebarCliente /> 
            }
        } else {   

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
    }


    return(
        <div className='container'>
            <view>{choiceSideBar()}</view>
            <div className='content'>
                <Header title={title} />
                {children}
            </div>
        </div>
        
    );
}