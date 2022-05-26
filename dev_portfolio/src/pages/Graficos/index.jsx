/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from '../../components/Layout';
import Loading from "../../components/Loading";
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
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
import './styles.scss';
import { toast } from 'react-toastify';

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

  const [ contProcedures, getProcedures ] = useState([]);
  const [ contValues, getValues ] = useState([]);
  const [ constCabelos, getCabelos ] = useState([]);
  const [ constBarbas, getBarbas ] = useState([]);
  const [ constSobrancelhas, getSobrancelhas ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const [ lucroBruto, getLucroBruto ] = useState([]);
  const [ despesas, getDespesas ] = useState([]);
  const [ lucroLiquido, getLucroLiquido ] = useState([]);

  const { barberList, getBarberList } = useProcedures();

  useEffect(() => {
    getBarberList();
  }, []);
  
  let labels = []
  const barbeiros = barberList.map(item => {
    labels.push(item.Usuario.nome)
  })

  const getGraphics = async (e) => {
    setLoading(true); 
    e.preventDefault();
    if (inicialDate === '' || finallyDate === '' ) {
      toast.error("É necessário preencher as duas datas")
      setLoading(false)
    } else{
      try{

        let atendimentos = []
        let cabelo = []
        let barba = []
        let sobrancelha = []
        let valor = []
        let lucroBruto = 0
        let pagamentos = 0
        let lucroLiquido = 0

          const response = await Promise.all(

            barberList.map(async (item) => {
              
              const response = api.get(`atendimento?id_status_atendimento=1
                                        &data_fim_maior=${inicialDate}&data_fim_menor=${finallyDate}
                                        &id_barbeiro=${item.id_barbeiro}`);
              return response                        
            })
          );
          
          response.flatMap((atend) => {

            let valorRecebido = 0
            let contCabelo = 0
            let contBarba = 0
            let contSobrancelha = 0

            let atendimento = atend.data


            atendimentos.push(atendimento.length)
              
                const mapAtend = atendimento.map(itemAtend => {
                  valorRecebido = valorRecebido + itemAtend.valor
                  lucroBruto = lucroBruto + itemAtend.valor 
  
                  
                  const mapProcedimentos = itemAtend.Agendamento.ProcedimentoAgendamentos.map( itemProc => {
                    if (itemProc.Procedimento.procedimento.includes('cabelo')) {
                      contCabelo = contCabelo + 1
                    } else if (itemProc.Procedimento.procedimento.includes('barba')) {
                      contBarba = contBarba + 1
                    } else if (itemProc.Procedimento.procedimento.includes('Sobrancelha')) {
                      contSobrancelha = contSobrancelha + 1
                    }
                  });
                });
              
              cabelo.push(contCabelo)
              sobrancelha.push(contSobrancelha)
              barba.push(contBarba)
              valor.push(valorRecebido/100) 
              });
          
          const responsePagamentos = api.get(`/pagamento?data_pagamento_maior${inicialDate}&data_pagamento_menor${finallyDate}`).then((pag) => {
              if (pag.data.length > 0) {
                pag.data.map(item => {
                  pagamentos = pagamentos + item.valor
                });
              }
              lucroLiquido = lucroBruto - pagamentos
              getDespesas([pagamentos])
              getLucroLiquido([lucroLiquido])
          });    
          getProcedures(atendimentos)
          getValues(valor)
          getCabelos(cabelo)
          getBarbas(barba)
          getSobrancelhas(sobrancelha)
          getLucroBruto([lucroBruto])
          setLoading(false)
      } catch {
        setLoading(false)
        console.log("Erro")
        toast.error("Erro ao gerar informações para construção do gráfico")
      }
    }
  };

  const options1 = {
    responsive: true,
    maintainAspectRatio: false,

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
  
  const data1 = {
    labels,
    datasets: [
      {
        label: 'Atendimentos',
        data: contProcedures,
        backgroundColor: 'red',
      },
      {
        label: 'Cabelo',
        data: constCabelos,
        backgroundColor: 'green',
      },
      {
        label: 'Barba',
        data: constBarbas,
        backgroundColor: 'blue',
      },
      {
        label: 'Sobrancelha',
        data: constSobrancelhas,
        backgroundColor: 'yellow',
      },
      {
        label: 'Valor Recebido (/100)',
        data: contValues,
        backgroundColor: 'pink',
      },
    ],
  };


  const options2 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Resultado Financeiro',
      },
    },
  };
  
  const data2 = {
    labels: ['RH Barbearia'],
    datasets: [
      {
        label: 'Lucro Bruto',
        data: lucroBruto,
        backgroundColor: 'red',
      },
      {
        label: 'Despesas',
        data: despesas,
        backgroundColor: 'green',
      },
      {
        label: 'Lucro Líquido',
        data: lucroLiquido,
        backgroundColor: 'blue',
      },
    ],
  };


  return (
    <Layout title='Gráficos'>
      <div className='tabsDates'>
        <label className="label">De:</label>
        <input
          type='date'
          max={moment().format("YYYY-MM-DD")}
          min={`${(moment().format("YYYY")-50)}-${moment().format("MM-DD")}`}
          className='inputDates'
          onChange={ ({target}) => setInicialDate(new Date(target.value).getTime() / 1000)}
          required
        />
        <label className="label">Até:</label>
        <input
          type='date'
          max={moment().format("YYYY-MM-DD")}
          min={`${(moment().format("YYYY")-50)}-${moment().format("MM-DD")}`}
          className='inputDates'
          onChange={ ({target}) => setFinallyDate(new Date(target.value).getTime() / 1000)}
          required
        />
      </div>
      <div className='tabsButton'>
        <button
          type='button'
          className='btn-primary'
          onClick={(e) => {
            getGraphics(e);
          }}
        >{ loading ? <Loading /> : "Gerar Gráficos"}
        </button>
      </div>
      <div className="grafico">
        <Bar options={options2}
          width={50}
          height={20}
        data={data2} />
      </div>
      <div className="grafico">
        <Bar options={options1}
          width={50}
          height={20}
        data={data1} />
      </div>
    </Layout>
  );
};
