import {
    forwardRef,
    ForwardRefRenderFunction,
    InputHTMLAttributes,
  } from 'react';
  
  import { InputContainer } from './style';
  
//   interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//     name: string;
//     label?: string;
//     error?: FieldError;
//     width?: string;
//   }
  
  const InputBase = (
    { children, name, label, width, autoComplete, ...rest },
    ref,
  ) => {
    return (
      <InputContainer width={width}>
        {!!label && <label htmlFor={name}>{label}</label>}
        <input name={name} autoComplete={autoComplete} {...rest} ref={ref} />
        {children}
      </InputContainer>
    );
  };
  
  export const Input = forwardRef(InputBase);