import React , { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiUser, BiCalendarEvent, BiCreditCard, BiLineChartDown } from 'react-icons/bi';
import RHpicture from '../../../resources/rhbarbeariadiminuido.jpg'
import { FaExchangeAlt } from "react-icons/fa";
import { useAuth } from '../../../hooks/useAuth';

import '../styles.scss';

export const SidebarAdm = () => {

    const [pinned, setPinned] = useState(true);
    const { userSigned, signed } = useAuth();

    const barb = userSigned.roles.find( obj => 'barbeiro' in obj );
    const cliente = userSigned.roles.find( obj => 'cliente' in obj );


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
                        <Link>
                            <BiUser size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Meus Dados</span>
                        </Link>
                    </li>

                    <li className='withSubMenu'>
                        <div>
                            <Link onClick={ () => document.getElementById('subMenu1').classList.toggle('expanded') }>
                                <BiCreditCard size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Pagamentos</span>
                            </Link>                 
                        </div>
                        <ul id="subMenu1" className="subMenu">
                            <li><Link>Recebidos</Link></li>
                            <li><Link>Realizados</Link></li>
                        </ul>
                    </li>
                    <li className='withSubMenu'>
                        <div>
                            <Link onClick={ () => document.getElementById('subMenu2').classList.toggle('expanded') }>
                                <BiCalendarEvent size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Itens Gerenciados</span>
                            </Link>                 
                        </div>
                        <ul id="subMenu2" className="subMenu">
                            <li><Link>Consultar</Link></li>
                            <li><Link>Editar</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div>
                             <Link>
                                <BiLineChartDown size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Relatorios</span>
                            </Link>                 
                        </div>
                    </li>
                    <li className='withSubMenu' id="chageRole">
                        <div id={barb === undefined && cliente === undefined ? 'hiddenTrue' : 'hiddenFalse'}>
                            <Link onClick={ () => document.getElementById('subMenu3').classList.toggle('expanded')}>
                                <FaExchangeAlt size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Alterar Visão</span>
                            </Link>
                        </div>  
                        <ul id="subMenu3" className="subMenu">
                            <li>{barb !== undefined ? <Link to={{
                                pathname: "/geral",
                                state: "barbeiro"
                            }}>Barbeiro</Link> : null}</li>

                            <li>{cliente !== undefined ? <Link to={{
                                pathname: "/geral",
                                state: "cliente"
                            }}>Cliente</Link> : null}</li>
                        </ul>
                    </li>
                    
                </ul>
            </div>

    </nav>

  );
};