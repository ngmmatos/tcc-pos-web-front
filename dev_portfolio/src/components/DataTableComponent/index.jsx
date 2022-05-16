import { useMemo, useState } from 'react';
import './style.scss';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

export const DataTableComponent = ({ fieldsDataTable, sortDataTable }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 0,
    direction: 'ascending',
  });

  const sortedItems = useMemo(() => {
    if (fieldsDataTable.length === 0) return;
    let sortFields = [...fieldsDataTable[1].fields];
    if (sortConfig !== null) {
      sortFields.sort((a, b) => {
        const indexA = Object.values(a);
        const indexB = Object.values(b);
        if (indexA[sortConfig.key] < indexB[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (indexA[sortConfig.key] > indexB[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortFields;
  }, [fieldsDataTable, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className='tableCustom'>
      <thead className='thCustom'>
        <tr>
          {fieldsDataTable[0].headers.map((item, index) => {
            if (typeof item === 'function') {
              return (
                <th key={index}>
                  <input type='checkbox' />
                </th>
              );
            }
            return (
              <>
                {item === 'Editar' || item === 'Excluir' ? (
                  <th
                    style={{ maxWidth: '75px', minWidth: '75px' }}
                    key={index}
                  >
                    <span>{item}</span>
                  </th>
                ) : (
                  <th onClick={() => requestSort(index)} key={index}>
                    <div className='th-dataTable'>
                      {sortConfig.direction === 'ascending' &&
                      sortConfig.key === index ? (
                        <FaArrowCircleUp />
                      ) : (
                        <FaArrowCircleDown />
                      )}
                      <span>{item}</span>
                    </div>
                  </th>
                )}
              </>
            );
          })}
        </tr>
      </thead>
      <tbody className='tbodyCustom'>
        {sortedItems.map((item, index) => {
          const fieldsValue = Object.values(item);

          return (
            <tr key={index}>
              {fieldsValue.map((item, index) => {
                if (typeof item === 'object') {
                  return (
                    <td
                      style={{ maxWidth: '75px', minWidth: '75px' }}
                      key={index}
                    >
                      {item}
                    </td>
                  );
                }
                return <td key={index}>{item}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
