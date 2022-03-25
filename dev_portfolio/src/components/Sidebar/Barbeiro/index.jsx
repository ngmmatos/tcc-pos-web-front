import React , { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiUser, BiCalendarEvent, BiCreditCard } from 'react-icons/bi';
import { FaExchangeAlt } from "react-icons/fa";
import RHpicture from '../../../resources/rhbarbeariadiminuido.jpg'

import '../styles.scss';

export const SidebarBarbeiro = () => {

    const [pinned, setPinned] = useState(true);

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
                        <Link to="/">
                            <BiUser size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Meus Dados</span>
                        </Link>
                    </li>

                    <li>
                        <div>
                            <Link to="#">
                                <BiCalendarEvent size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Minha Agenda</span>
                            </Link>                 
                        </div>
                    </li>

                    <li className='withSubMenu'>
                        <div>
                            <Link to="#" onClick={ () => document.getElementById('subMenu1').classList.toggle('expanded') }>
                                <BiCreditCard size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Pagamentos</span>
                            </Link>                 
                        </div>
                        <ul id="subMenu1" className="subMenu">
                            <li><Link to="">Consultar</Link></li>
                            <li><Link to="">Receber</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div>
                            <Link to="#">
                                <FaExchangeAlt size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Alterar Visão</span>
                            </Link>                 
                        </div>
                    </li>
                </ul>
            </div>

    </nav>

  );
};