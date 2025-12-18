import React from 'react';

const InputError = ({ error }) => {
  if (!error) return null;

  const errorStyle = {
    fontSize: '12px',
    color: '#fa5252',
    marginTop: '4px',
    lineHeight: '1.55',
  };

  return <div style={errorStyle}>{typeof error === 'string' ? error : ''}</div>;
};

export default InputError;

