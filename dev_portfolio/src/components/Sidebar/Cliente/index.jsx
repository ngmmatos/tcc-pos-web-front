import React , { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiUser, BiCalendarEvent, GrScheduleNew } from 'react-icons/bi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { ImScissors } from 'react-icons/im';
import { BsInfoCircleFill } from 'react-icons/bs';
import RHpicture from '../../../resources/rhbarbeariadiminuido.jpg'

import '../styles.scss';

export const SidebarCliente = () => {

    const [pinned, setPinned] = useState(true);

    function handlePinSidebar() {
        setPinned(!pinned);
    }

  return (
    <nav className={pinned ? 'sidebar' : 'sidebar close'}>
        <header>
            <img src={RHpicture} alt="Logotipo RH Barbearia" className="image-text"/>
        {/* <button
            type="button"
            className={pinned ? 'pin-button-active' : 'pin-button-inactive'}
            onClick={handlePinSidebar}
          >
            {pinned ? <IoIosArrowBack  /> : <IoIosArrowForward  />  }
          </button> */}

        </header>

        <div className="menuContainer">
                <ul>
                    <li>
                        <Link to="/alteracliente">
                            <BiUser size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Meus Dados</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="meusagendamentos">
                            <AiOutlineSchedule size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Agendamentos</span>
                        </Link>
                    </li>

                    <li className='withSubMenu'>
                        <div>
                            {/* <Link to="" onClick={ () => document.getElementById('subMenu').classList.toggle('expanded') }> */}
                            <Link to="/agenda">
                                <BiCalendarEvent size="2rem"/>
                                <span className={pinned ? 'itemList pinned' : 'itemList'}>Agenda</span>
                            </Link>                 
                        </div>
                        {/* <ul id="subMenu" className="subMenu">
                            <li><Link to="">Geral</Link></li>
                            <li><Link to="">Por Barbeiro</Link></li>
                        </ul> */}
                    </li>

                    <li>
                        <Link to="/listaprocedimento">
                            <ImScissors size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>Serviços</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/rhbarbearia">
                            <BsInfoCircleFill size="2rem"/>
                            <span className={pinned ? 'itemList pinned' : 'itemList'}>RH Barbearia</span>
                        </Link>
                    </li>
                </ul>
            </div>

    </nav>

  );
};