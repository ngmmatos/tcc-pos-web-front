import { BiChevronDown } from 'react-icons/bi';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export const CustomSelect = ({ name, label, options, value, changeValue}) => {

  const [optionSelected, setOptionSelected] = useState(value);

  const handleClick = (option) => {
    changeValue(option);
    setOptionSelected(option);
  }

  useEffect(() => {
    setOptionSelected(value);
  }, [value]);

  return(
    <div className={styles.selectContainer}>
      <BsGenderAmbiguous />
      <div>
      {!!label && <label htmlFor={name}>{label}</label>}
        <select name={name} id={name} >
          { options.map( option => (
            <option key={option.value} value={option.value} onChange={() => handleClick(option)}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}