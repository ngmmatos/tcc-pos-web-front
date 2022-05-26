import React, { useState } from 'react';
import { DataTableInsumo } from '../../components/DataTableInsumos';
import { Layout } from '../../components/Layout';

export const DataTableIns = () => {
  const [tabDataTable, setTabDataTable] = useState('Insumos');
  return (
    <Layout title='Insumos'>
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
        {tabDataTable === 'Insumos' ? (
          <DataTableInsumo />
        ) : (
          <div>
            <h1>Insumos</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};
