import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiUser, BiCalendarEvent, GrScheduleNew } from 'react-icons/bi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { ImScissors } from 'react-icons/im';
import { BsInfoCircleFill } from 'react-icons/bs';
import RHpicture from '../../../resources/rhbarbeariadiminuido.jpg';
import { useWindowDimensions } from '../../../hooks/useDimensions';
import { useAuth } from '../../../hooks/useAuth';
import { FaExchangeAlt } from 'react-icons/fa';

import '../styles.scss';

export const SidebarCliente = () => {
  const { width } = useWindowDimensions();
  const [pinned, setPinned] = useState(true);
  const [subMenu, setSubMenu] = useState([false, false, false]);
  const { userSigned, signed } = useAuth();

  const adm = userSigned.roles.find((obj) => 'admin' in obj);
  const barb = userSigned.roles.find((obj) => 'barbeiro' in obj);

  useEffect(() => {
    if (width >= 768) {
      setPinned(true);
    } else {
      setPinned(false);
    }
  }, [width]);
  const toggleSubMenu = (e, id) => {
    e.preventDefault();
    const newState = subMenu.slice(0);
    newState[id] = !subMenu[id];
    setSubMenu(newState);
  };

  return (
    <nav className={pinned ? 'sidebar' : 'sidebar close'}>
      <div
        className='menuContainer'
        onMouseEnter={() => setPinned(true)}
        onMouseLeave={() => setPinned(false)}
      >
        <ul className='menuPrincipal'>
          <li>
            <Link
              to={{
                pathname: '/alteracliente',
                state: 'cliente',
              }}
            >
              <BiUser size='2rem' />
              <span className={pinned ? 'itemList pinned' : 'itemList'}>
                Meus Dados
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: '/agendamentosclientes',
                state: 'cliente',
              }}
            >
              <AiOutlineSchedule size='2rem' />
              <span className={pinned ? 'itemList pinned' : 'itemList'}>
                Agendamentos
              </span>
            </Link>
          </li>

          <li className='withSubMenu'>
            <div>
              {/* <Link to="" onClick={ () => document.getElementById('subMenu').classList.toggle('expanded') }> */}
              <Link
                to={{
                  pathname: '/agenda',
                  state: 'cliente',
                }}
              >
                <BiCalendarEvent size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Agenda
                </span>
              </Link>
            </div>
            {/* <ul id="subMenu" className="subMenu">
                            <li><Link to="">Geral</Link></li>
                            <li><Link to="">Por Barbeiro</Link></li>
                        </ul> */}
          </li>

          <li>
            <Link
              to={{
                pathname: '/listaprocedimento',
                state: 'cliente',
              }}
            >
              <ImScissors size='2rem' />
              <span className={pinned ? 'itemList pinned' : 'itemList'}>
                Serviços
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={{
                pathname: '/rhbarbearia',
                state: 'cliente',
              }}
            >
              <BsInfoCircleFill size='2rem' />
              <span className={pinned ? 'itemList pinned' : 'itemList'}>
                RH Barbearia
              </span>
            </Link>
          </li>
          <li className='withSubMenu' id='chageRole'>
            <div
              id={
                barb === undefined && adm === undefined
                  ? 'hiddenTrue'
                  : 'hiddenFalse'
              }
            >
              <Link onClick={(e) => toggleSubMenu(e, 0)}>
                <FaExchangeAlt size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Alterar Visão
                </span>
              </Link>
            </div>
            <ul id='subMenu3'
              className={
                !pinned
                  ? 'subMenu'
                  : subMenu[0]
                  ? 'subMenu expanded'
                  : 'subMenu'
              }
            >
              <li>
                {barb !== undefined ? (
                  <Link
                    to={{
                      pathname: '/geral',
                      state: 'barbeiro',
                    }}
                  >
                    Barbeiro
                  </Link>
                ) : null}
              </li>

              <li>
                {adm !== undefined ? (
                  <Link
                    to={{
                      pathname: '/geral',
                      state: 'adm',
                    }}
                  >
                    Administrador
                  </Link>
                ) : null}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
