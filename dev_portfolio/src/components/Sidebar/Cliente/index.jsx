import React , { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiUser, BiCalendarEvent, GrScheduleNew } from 'react-icons/bi';
import { FaExchangeAlt } from "react-icons/fa";
import { AiOutlineSchedule } from 'react-icons/ai';
import { ImScissors } from 'react-icons/im';
import { BsInfoCircleFill } from 'react-icons/bs';
import RHpicture from '../../../resources/rhbarbeariadiminuido.jpg'
import { useAuth } from '../../../hooks/useAuth';

import '../styles.scss';

export const SidebarCliente = () => {

    const { userSigned, signed } = useAuth();
    const [pinned, setPinned] = useState(true);
    
    const adm = userSigned.roles.find( obj => 'admin' in obj );
    const barber = userSigned.roles.find( obj => 'barbeiro' in obj );

    function handlePinSidebar() {
        setPinned(!pinned);
    }

  return (
    <nav className={pinned ? 'sidebar' : 'sidebar close'}>
        <header>
            <img src={RHpicture} alt="Logotipo RH Barbearia" className="image-text"/>
        <button
            type="button"
            className={pinned ? 'pin-button-active' : 'pin-button-inactive'}
            onClick={handlePinSidebar}
          >
            {pinned ? <IoIosArrowBack  /> : <IoIosArrowForward  />  }
          </button>

        </header>


            <div className="menuContainer">
                <ul>
                    <li>
                        <Link to={{
                                pathname: "/alteracliente",
                                state: "cliente"}}>
                            <BiUser size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Meus Dados</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                                pathname: "/meusagendamentos",
                                state: "cliente"}}>
                            <AiOutlineSchedule size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Agendamentos</span>
                        </Link>
                    </li>

                    <li>
                        <div>
                            <Link to={{
                                pathname: "/agenda",
                                state: "cliente"}}>
                                <BiCalendarEvent size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Agenda</span>
                            </Link>                 
                        </div>
                    </li>

                    <li>
                        <Link to={{
                                pathname: "/listaprocedimento",
                                state: "cliente"}}>
                            <ImScissors size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Serviços</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                                pathname: "/rhbarbearia",
                                state: "cliente"}}>
                            <BsInfoCircleFill size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>RH Barbearia</span>
                        </Link>
                    </li>
                    <li className='withSubMenu' id="chageRole">
                        <div id={adm === undefined && barber === undefined ? 'hiddenTrue' : 'hiddenFalse'}>
                            <Link onClick={ () => document.getElementById('subMenu1').classList.toggle('expanded')}>
                                <FaExchangeAlt size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Alterar Visão</span>
                            </Link>
                        </div>  
                        <ul id="subMenu1" className="subMenu">
                            <li>{adm !== undefined ? <Link to={{
                                pathname: "/geral",
                                state: "adm"
                            }}>Administrador</Link> : null}</li>

                            <li>{barber !== undefined ? <Link to={{
                                pathname: "/geral",
                                state: "barbeiro"
                            }}>Barbeiro</Link> : null}</li>
                        </ul>
                    </li>
                </ul>
            </div>

    </nav>

  );
};
