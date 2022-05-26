import React, { useState } from 'react';
import { DataTableConta } from '../../components/DataTableContas';
import { Layout } from '../../components/Layout';

export const DataTableCont = () => {
  const [tabDataTable, setTabDataTable] = useState('Contas');
  return (
    <Layout title='Contas'>
      <div className='tabsButtons-principal'>
        {/* <button
          type='button'
          className={tabDataTable === 'Usuarios' ? 'active' : ''}
          onClick={() => setTabDataTable('Fornecedores')}
        >
          Fornecedores
        </button>
        <button
          type='button'
          className={tabDataTable === 'Fornecedores' ? 'active' : ''}
          onClick={() => setTabDataTable('Usuarios')}
        >
          Usuários
        </button> */}
      </div>
      <div style={{ width: '100%' }}>
        {tabDataTable === 'Contas' ? (
          <DataTableConta />
        ) : (
          <div>
            <h1>Contas</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};
