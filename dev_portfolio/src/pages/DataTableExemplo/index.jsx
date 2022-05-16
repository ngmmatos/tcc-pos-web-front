import React, { useState } from 'react';
import { DataTableUser } from '../../components/DataTableUsuarios';
import { Layout } from '../../components/Layout';

export const DataTableExemplo = () => {
  const [tabDataTable, setTabDataTable] = useState('Usuarios');
  return (
    <Layout title='DataTableExemplo'>
      <div className='tabsButtons-principal'>
        <button
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
        </button>
      </div>
      <div style={{ width: '100%' }}>
        {tabDataTable === 'Usuarios' ? (
          <DataTableUser />
        ) : (
          <div>
            <h1>Fornecedores</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};
