import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  BiUser,
  BiCalendarEvent,
  BiCreditCard,
  BiLineChartDown,
} from 'react-icons/bi';

import { FaExchangeAlt } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';

import '../styles.scss';

export const SidebarAdm = () => {
  const [pinned, setPinned] = useState(false);
  const { userSigned, signed } = useAuth();
  const [subMenu, setSubMenu] = useState([false, false, false]);

  const barb = userSigned.roles.find((obj) => 'barbeiro' in obj);
  const cliente = userSigned.roles.find((obj) => 'cliente' in obj);

  const toggleSubMenu = (e, id) => {
    e.preventDefault();
    const newState = subMenu.slice(0);
    newState[id] = !subMenu[id];
    setSubMenu(newState);
  };

  return (
    <nav className={pinned ? 'sidebar' : 'sidebar close'}>
      <header>
        {/* <button
          type='button'
          className={pinned ? 'pin-button-active' : 'pin-button-inactive'}
          onClick={handlePinSidebar}
        >
          {pinned ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button> */}
      </header>

      <div
        className='menuContainer'
        onMouseEnter={() => setPinned(true)}
        onMouseLeave={() => setPinned(false)}
      >
        <ul className='menuPrincipal'>
          <li>
            <Link to='/alteracliente'>
              <BiUser size='2rem' />
              <span className={pinned ? 'itemList pinned' : 'itemList'}>
                Meus Dados
              </span>
            </Link>
          </li>

          <li className='withSubMenu'>
            <div>
              <Link
              to={{
                pathname: '/datatablepagamentos',
                state: 'adm',
              }}
              >
                <BiCreditCard size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Pagamentos
                </span>
              </Link>
            </div>
            {/* <ul id='subMenu1' className='subMenu'>
              <li>
                <Link>Recebidos</Link>
              </li>
              <li>
                <Link>Realizados</Link>
              </li>
            </ul> */}
          </li>
          <li className='withSubMenu'>
            <div>
                <Link onClick={(e) => toggleSubMenu(e, 2)}>
                <BiCalendarEvent size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Itens Gerenciados
                </span>
              </Link>
            </div>
            <ul id='subMenu2' 
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
                pathname: '/datatable',
                state: 'adm',
              }}
              >Usuários</Link>
              </li>
              <li>
                <Link
                to={{
                  pathname: '/datatablecontas',
                  state: 'adm',
                }}
                >Contas</Link>
              </li>
              <li>
                <Link
                to={{
                  pathname: '/datatableinsumo',
                  state: 'adm',
                }}                
                >Insumo</Link>
              </li>
              <li>
                <Link
                to={{
                  pathname: '/datatablefornecedores',
                  state: 'adm',
                }}
                >Fornecedores</Link>
              </li>
              <li>
                <Link
                to={{
                  pathname: '/datatableprocedimentos',
                  state: 'adm',
                }}                
                >Procedimentos</Link>
              </li>
            </ul>
          </li>
          <li>
            <div>
              <Link
                to={{
                  pathname: '/graficos',
                  state: 'adm',
                }}
              >
                <BiLineChartDown size='2rem' />
                <span className={pinned ? 'itemList pinned' : 'itemList'}>
                  Gráficos
                </span>
              </Link>
            </div>
          </li>
          <li className='withSubMenu' id='chageRole'>
            <div
              id={
                barb === undefined && cliente === undefined
                  ? 'hiddenTrue'
                  : 'hiddenFalse'
              }
            >
            <Link onClick={(e) => toggleSubMenu(e, 3)}>
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
                  : subMenu[3]
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
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
