import React from 'react';
import InputLabel from './InputLabel';
import InputDescription from './InputDescription';
import InputError from './InputError';
import InputWrapper from './InputWrapper';
import { useInputStyles } from './utils/useInputStyles';

const Input = ({
  type = 'text',
  placeholder,
  label,
  description,
  error,
  variant = 'default',
  radius = 4,
  size = 'md',
  disabled = false,
  withAsterisk = false,
  icon,
  value,
  onChange,
  name,
  ...props
}) => {
  const { inputStyle, leftSectionStyle, isFocused, setIsFocused } = useInputStyles({
    size,
    radius,
    variant,
    disabled,
    error,
    icon,
  });

  const containerStyle = {
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <InputLabel label={label} name={name} withAsterisk={withAsterisk} />
      <InputDescription description={description} />
      <InputWrapper icon={icon} leftSectionStyle={leftSectionStyle}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          style={inputStyle}
          id={name}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur && props.onBlur(e);
          }}
          {...props}
        />
      </InputWrapper>
      <InputError error={error} />
    </div>
  );
};

export default Input;

