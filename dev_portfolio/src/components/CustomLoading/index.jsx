import React from 'react';
import './style.scss';

export function CustomLoading() {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
