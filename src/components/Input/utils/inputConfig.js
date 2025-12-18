// Конфигурация размеров для компонента Input
export const sizeConfig = {
  xs: { fontSize: '12px', padding: '4px 10px', height: '30px', sectionWidth: '28px' },
  sm: { fontSize: '13px', padding: '6px 12px', height: '36px', sectionWidth: '32px' },
  md: { fontSize: '14px', padding: '8px 12px', height: '42px', sectionWidth: '36px' },
  lg: { fontSize: '15px', padding: '10px 14px', height: '48px', sectionWidth: '40px' },
  xl: { fontSize: '16px', padding: '12px 16px', height: '54px', sectionWidth: '44px' },
};

// Конфигурация радиусов для компонента Input
export const radiusMap = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '9999px',
};

// Получить конфигурацию размера
export const getSizeConfig = (size) => {
  return sizeConfig[size] || sizeConfig.md;
};

// Получить значение радиуса
export const getRadiusValue = (radius) => {
  if (typeof radius === 'string' && radiusMap[radius]) {
    return radiusMap[radius];
  }
  if (typeof radius === 'number') {
    return `${radius}px`;
  }
  return radiusMap.md;
};

