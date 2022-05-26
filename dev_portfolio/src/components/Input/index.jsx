import { forwardRef, useCallback, useRef, useState } from 'react';
import './style.scss';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export const InputBaseRef = (
  { children, name, label, icon, value, handleChange, type, ...props },
  ref
) => {
  
  const [focus, setFocus] = useState(false);

  const onBlur = (e) => {
    if (e.target.value.length > 0) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  const onFocus = (e) => {
    setFocus(true);
  };

  let Icon = icon;
  return (
    <div className='inputBase-root'>
      <Icon />
      <div style={{ margin: 0 }}>
        <label
          className={focus || type === 'date' || value ? 'focused' : ''}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          {...props}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export const InputBase = forwardRef(InputBaseRef);
