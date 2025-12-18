import React from 'react';

const InputDescription = ({ description }) => {
  if (!description) return null;

  const descriptionStyle = {
    fontSize: '12px',
    color: '#868e96',
    marginTop: '4px',
    marginBottom: '6px',
    lineHeight: '1.55',
  };

  return <div style={descriptionStyle}>{description}</div>;
};

export default InputDescription;

