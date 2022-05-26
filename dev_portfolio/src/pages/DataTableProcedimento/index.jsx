import React, { useState } from 'react';
import { DataTableProcedimento } from '../../components/DataTableProcedimentos';
import { Layout } from '../../components/Layout';

export const DataTableProc = () => {
  const [tabDataTable, setTabDataTable] = useState('Procedimentos');
  return (
    <Layout title='Procedimentos'>
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
        {tabDataTable === 'Procedimentos' ? (
          <DataTableProcedimento />
        ) : (
          <div>
            <h1>Procedimentos</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};
