import React, { useState } from 'react';
import { DataTableForn } from '../../components/DataTableFornecedores';
import { Layout } from '../../components/Layout';

export const DataTableFornecedor = () => {
  const [tabDataTable, setTabDataTable] = useState('Fornecedores');
  return (
    <Layout title='Fornecedores'>
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
        {tabDataTable === 'Fornecedores' ? (
          <DataTableForn />
        ) : (
          <div>
            <h1>Fornecedores</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};
