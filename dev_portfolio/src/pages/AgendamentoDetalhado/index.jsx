/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from '../../components/Layout';

import { CardDetalhe } from '../../components/CardAgendamento/index';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';

import { api } from '../../services/api';
import { TabBar } from '../../components/TabBar';
import { AtendimentoAgenda } from '../../components/AtendimentoAgenda';
import { useAgendamento } from '../../hooks/useAgendamento';
import { useAtendimento } from '../../hooks/useAtendimento';
import { addHours, getTime, getUnixTime, parseISO } from 'date-fns';
import { DataTableComponent } from '../../components/DataTableComponent';

const moment = require('moment');
process.env.TZ = 'America/Sao_Paulo';

export const AgendamentoDetalhado = () => {
  const { userSigned } = useAuth();
  const { getAtendimentoBarbeiro, atendimentos } = useAtendimento();
  const { agendaBarbeiro, getAgendaBarbeiro } = useAgendamento();
  const [filtroAtendimento, setFiltroAtendimento] = useState([]);
  const [buscaAtendimento, setBuscaAtendimento] = useState(false);
  const [tabAgenda, setTabAgenda] = useState('Agendado');
  const [filtroAgenda, setFiltroAgenda] = useState([]);
  const [buscaAgendamento, setBuscaAgendamento] = useState(false);
  const [tabAtendimento, setTabAtendimento] = useState('Atendimento');
  const { barbeiro } = userSigned.roles.find((item) => item.barbeiro);

  const handleSearchAtendimento = async (e) => {
    setBuscaAtendimento(true);
    e.preventDefault();
    getAgendaBarbeiro(barbeiro);
    const { value } = e.target;
    const changeDate = moment(value).format('DD/MM');
    const filterAtendimento = atendimentos.filter(
      (item) => item.dataProcedimento === changeDate
    );
    setFiltroAtendimento(filterAtendimento);
  };

  const handleSearchAgendamento = async (e) => {
    setBuscaAgendamento(true);
    e.preventDefault();
    getAgendaBarbeiro(barbeiro);
    const { value } = e.target;
    const changeDate = moment(value).format('DD/MM');
    const filterAgendamento = agendaBarbeiro.filter(
      (item) => item.dataProcedimento === changeDate
    );
    setFiltroAgenda(filterAgendamento);
  };

  const handleChangeTab = (value) => {
    setFiltroAgenda([]);
    setFiltroAtendimento([]);
    setBuscaAgendamento(false);
    setBuscaAtendimento(false);
    setTabAgenda(value);
  };

  useEffect(() => {
    getAtendimentoBarbeiro(barbeiro);
    getAgendaBarbeiro(barbeiro);
  }, [barbeiro]);

  const fieldTabsAgendamento = [
    {
      status: 'Agendado',
      title: 'Agendado',
      tab: tabAgenda,
      handleChangeTab: handleChangeTab,
    },
    {
      status: 'Encerrado',
      title: 'Encerrado',
      tab: tabAgenda,
      handleChangeTab: handleChangeTab,
    },
  ];

  const fieldTabsAtendimento = [
    {
      status: 'iniciado',
      title: 'Iniciado',
      tab: tabAgenda,
      handleChangeTab: handleChangeTab,
    },

    {
      status: 'finalizado',
      title: 'Finalizado',
      tab: tabAgenda,
      handleChangeTab: handleChangeTab,
    },
  ];

  return (
    <Layout title='Meus Agendamentos'>
      <div className='tabsButtons-principal'>
        <button
          type='button'
          className={tabAtendimento === 'Atendimento' ? 'active' : ''}
          onClick={() => setTabAtendimento('Agendado')}
        >
          Agendado
        </button>
        <button
          type='button'
          className={tabAtendimento === 'Agendado' ? 'active' : ''}
          onClick={() => setTabAtendimento('Atendimento')}
        >
          Atendimento
        </button>
      </div>
      <div style={{ width: '100%' }}>
        {tabAtendimento === 'Atendimento' ? (
          <div className='tabsButtons'>
            <TabBar fieldsTab={fieldTabsAtendimento} />
            <input
              type='date'
              className='inputDate'
              onChange={(e) => handleSearchAtendimento(e)}
            />
          </div>
        ) : (
          <div className='tabsButtons'>
            <TabBar fieldsTab={fieldTabsAgendamento} />
            <input
              type='date'
              className='inputDate'
              onChange={(e) => handleSearchAgendamento(e)}
            />
          </div>
        )}
      </div>
      <div className='containerAgendaBarbeiro'>
        {tabAtendimento === 'Atendimento' ? (
          <>
            <AtendimentoAgenda
              tabAgenda={tabAgenda}
              buscaAtendimento={buscaAtendimento}
              filtroAtendimento={filtroAtendimento}
            />
          </>
        ) : (
          <>
            {filtroAgenda && filtroAgenda.length > 0
              ? filtroAgenda?.map((item) => (
                  <CardDetalhe
                    key={item.id}
                    agendamento={item}
                    refreshingAgenda={getAgendaBarbeiro}
                  />
                ))
              : buscaAgendamento && <p>Nenhum item encontrado</p>}

            {agendaBarbeiro &&
              !buscaAgendamento &&
              agendaBarbeiro.map((agendamento) => {
                return (
                  { ...agendamento }.status === tabAgenda && (
                    <CardDetalhe
                      key={agendamento.id}
                      agendamento={agendamento}
                      refreshingAgenda={getAgendaBarbeiro}
                    />
                  )
                );
              })}
          </>
        )}
      </div>
    </Layout>
  );
};
