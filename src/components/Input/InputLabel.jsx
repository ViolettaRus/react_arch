import React from 'react';

const InputLabel = ({ label, name, withAsterisk }) => {
  if (!label) return null;

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#212529',
    lineHeight: '1.55',
  };

  return (
    <label style={labelStyle} htmlFor={name}>
      {label}
      {withAsterisk && <span style={{ color: '#fa5252', marginLeft: '4px' }}>*</span>}
    </label>
  );
};

export default InputLabel;

