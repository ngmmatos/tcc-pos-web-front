import React, { useState } from 'react';
import { DataTablePagamento } from '../../components/DataTablePagamentos';
import { Layout } from '../../components/Layout';

export const DataTablePag = () => {
  const [tabDataTable, setTabDataTable] = useState('Pagamentos');
  return (
    <Layout title='Pagamentos'>
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
        {tabDataTable === 'Pagamentos' ? (
          <DataTablePagamento />
        ) : (
          <div>
            <h1>Pagamentos</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};
