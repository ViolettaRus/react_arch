import React from 'react';

const InputWrapper = ({ icon, children, leftSectionStyle }) => {
  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={inputWrapperStyle}>
      {icon && <div style={leftSectionStyle}>{icon}</div>}
      {children}
    </div>
  );
};

export default InputWrapper;

