import React from 'react';
import './FormButton.css';

const FormButton = ({ children, type = 'submit', className = '', ...props }) => {
  return (
    <button type={type} className={`form-button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default FormButton;

