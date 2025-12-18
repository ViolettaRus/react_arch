import { useState } from 'react';
import { getSizeConfig, getRadiusValue } from './inputConfig';

export const useInputStyles = ({
  size,
  radius,
  variant,
  disabled,
  error,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const config = getSizeConfig(size);
  const borderRadius = getRadiusValue(radius);
  const paddingLeft = icon ? config.sectionWidth : config.padding.split(' ')[1];

  // Точные цвета Mantine
  const borderColor = error 
    ? '#fa5252' 
    : isFocused
      ? '#339af0'
      : variant === 'filled' || variant === 'unstyled'
        ? 'transparent' 
        : '#dee2e6';

  const inputStyle = {
    fontSize: config.fontSize,
    padding: `${config.padding.split(' ')[0]} ${config.padding.split(' ')[1]} ${config.padding.split(' ')[0]} ${paddingLeft}`,
    height: config.height,
    borderRadius: borderRadius,
    border: `1px solid ${borderColor}`,
    backgroundColor: variant === 'filled' 
      ? '#f8f9fa' 
      : variant === 'unstyled'
        ? 'transparent'
        : disabled 
          ? '#f1f3f5' 
          : '#fff',
    color: disabled ? '#868e96' : '#000',
    cursor: disabled ? 'not-allowed' : 'text',
    width: '100%',
    outline: 'none',
    transition: 'border-color 100ms ease, box-shadow 100ms ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: '1.55',
    boxSizing: 'border-box',
  };

  // Focus state как в Mantine
  if (isFocused && !error && !disabled) {
    inputStyle.boxShadow = '0 0 0 1px #339af0';
  }

  const leftSectionStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: config.sectionWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#868e96',
    pointerEvents: 'none',
    zIndex: 1,
  };

  return {
    inputStyle,
    leftSectionStyle,
    isFocused,
    setIsFocused,
  };
};

