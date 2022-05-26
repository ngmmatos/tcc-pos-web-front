export const fieldsDataTable = [
  {
    headers: [
      'periodo',
      'Horário',
      'Agendado',
      'Tempo Livre',
      'Ações',
      'Excluir',
    ],
  },
  {
    fields: [
      {
        periodo: 'manha',
        data: 28,
        agendado: 'false',
        minutos_disponiveis: 15,
        handleChecked: () => {
          console.log('f1');
        },
        handleDeleteHour: () => {
          console.log('f2');
        },
      },
      {
        periodo: 'manha',
        data: 28,
        agendado: 'false',
        minutos_disponiveis: 15,
        handleChecked: () => {
          console.log('f3');
        },
        handleDeleteHour: () => {
          console.log('f4');
        },
      },
      {
        periodo: 'manha',
        data: 28,
        agendado: 'false',
        minutos_disponiveis: 15,
        handleChecked: () => {
          console.log('f5');
        },
        handleDeleteHour: () => {
          console.log('f6');
        },
      },
      {
        periodo: 'manha',
        data: 28,
        agendado: 'false',
        minutos_disponiveis: 15,
        handleChecked: () => {
          console.log('f7');
        },
        handleDeleteHour: () => {
          console.log('f8');
        },
      },
      {
        periodo: 'manha',
        data: 28,
        agendado: 'false',
        minutos_disponiveis: 15,
        handleChecked: () => {
          console.log('f9');
        },
        handleDeleteHour: () => {
          console.log('f0');
        },
      },
    ],
  },
];
