/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from '../../components/Layout';

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAdm } from '../../hooks/useAdm';
import { useProcedures } from '../../hooks/useProcedures';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker-br';
import './styles.scss';

const moment = require('moment');
process.env.TZ = 'America/Sao_Paulo';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Graficos = () => {
  const { userSigned } = useAuth();
  const [ inicialDate, setInicialDate ] = useState('');
  const [ finallyDate, setFinallyDate ] = useState('');

  const { barberList, getBarberList } = useProcedures();
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

  useEffect(() => {
    getBarberList();
  }, []);

  console.log(barberList)
  
  let labels = []
  const barbeiros = barberList.map(item => {
    labels.push(item.Usuario.nome)
  })

  labels = labels.sort()

  const getGraphics = (e) => {
    e.preventDefault();
    console.log(inicialDate)
    console.log(finallyDate)
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Desempenho Barbeiros',
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Atendimentos',
        data: [10, 20, 30],
        backgroundColor: 'red',
      },
      {
        label: 'Cabelo',
        data: [10, 20, 30],
        backgroundColor: 'green',
      },
      {
        label: 'Barba',
        data: [10, 20, 30],
        backgroundColor: 'blue',
      },
      {
        label: 'Sobrancelha',
        data: [10, 20, 30],
        backgroundColor: 'yellow',
      },
      {
        label: 'Lucro',
        data: [10, 20, 30],
        backgroundColor: 'pink',
      },
    ],
  };

  // useEffect(() => {
  //   getAtendimentoBarbeiro(barbeiro);
  //   getAgendaBarbeiro(barbeiro);
  // }, [barbeiro]);

  return (
    <Layout title='Relatórios'>
      <div className='tabsDates'>
        <label className="label">De:</label>
        <input
          required
          type='date'
          max={moment().format("YYYY-MM-DD")}
          min={`${(moment().format("YYYY")-50)}-${moment().format("MM-DD")}`}
          className='inputDates'
          onChange={({e}) => setInicialDate(new Date(e.value).getTime() / 1000)}
        />
        <label className="label">Até:</label>
        <input
          required
          type='date'
          max={moment().format("YYYY-MM-DD")}
          min={`${(moment().format("YYYY")-50)}-${moment().format("MM-DD")}`}
          className='inputDates'
          onChange={({e}) => setFinallyDate(new Date(e.value).getTime() / 1000)}
        />
      </div>
      <div className='tabsButton'>
        <button
          type='button'
          className='btn-primary'
          onClick={(e) => {
            getGraphics(e);
          }}
        >Gerar Relatórios
        </button>
      </div>
    <div className="grafico">
      <Bar options={options}
        width={50}
        height={50}
       data={data} />
    </div>
    </Layout>
  );
};
