import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiUser, BiCalendarEvent, BiCreditCard } from 'react-icons/bi';
import { FaExchangeAlt } from 'react-icons/fa';
import RHpicture from '../../../resources/rhbarbeariadiminuido.jpg';
import { useAuth } from '../../../hooks/useAuth';

import '../styles.scss';

export const SidebarBarbeiro = () => {
  const { userSigned, signed } = useAuth();
  const [pinned, setPinned] = useState(false);
  const [subMenu, setSubMenu] = useState([false, false, false]);

  const adm = userSigned.roles.find((obj) => 'admin' in obj);
  const cliente = userSigned.roles.find((obj) => 'cliente' in obj);

  const toggleSubMenu = (e, id) => {
    e.preventDefault();
    const newState = subMenu.slice(0);
    newState[id] = !subMenu[id];
    setSubMenu(newState);
  };

  return (
    <nav className={pinned ? 'sidebar closed' : 'sidebar closed'}>
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
                state: 'barbeiro',
              }}
            >
              <BiUser size='2rem' />
              <span className={pinned ? 'itemList pinned' : 'itemList'}>
                Meus Dados
              </span>
            </Link>
          </li>

          <li className='withSubMenu'>
            <div>
              <Link onClick={(e) => toggleSubMenu(e, 0)}>
                <BiCalendarEvent size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Minha Agenda
                </span>
              </Link>
            </div>
            <ul
              id='subMenu1'
              className={
                !pinned
                  ? 'subMenu'
                  : subMenu[0]
                  ? 'subMenu expanded'
                  : 'subMenu'
              }
            >
              <li>
                <Link
                  to={{
                    pathname: '/agendamentodetalhado',
                    state: 'barbeiro',
                  }}
                >
                  Abrir Agenda
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: '/meusagendamentos',
                    state: 'barbeiro',
                  }}
                >
                  Agendamentos
                </Link>
              </li>
            </ul>
          </li>

          {/* <li className='withSubMenu'>
            <div>
              <Link onClick={(e) => toggleSubMenu(e, 1)}>
                <BiCreditCard size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Pagamentos
                </span>
              </Link>
            </div>
            <ul
              id='subMenu1 '
              className={
                !pinned
                  ? 'subMenu'
                  : subMenu[1]
                  ? 'subMenu expanded'
                  : 'subMenu'
              }
            >
              <li>
                <Link>Consultar</Link>
              </li>
              <li>
                <Link>Receber</Link>
              </li>
            </ul>
          </li> */}
          <li className='withSubMenu' id='chageRole'>
            <div
              id={
                adm === undefined && cliente === undefined
                  ? 'hiddenTrue'
                  : 'hiddenFalse'
              }
            >
              <Link onClick={(e) => toggleSubMenu(e, 2)}>
                <FaExchangeAlt size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Alterar Visão
                </span>
              </Link>
            </div>
            <ul
              id='subMenu2'
              className={
                !pinned
                  ? 'subMenu'
                  : subMenu[2]
                  ? 'subMenu expanded'
                  : 'subMenu'
              }
            >
              <li>
                <Link
                  to={{
                    pathname: '/geral',
                    state: 'cliente',
                  }}
                >
                  Cliente
                </Link>
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
