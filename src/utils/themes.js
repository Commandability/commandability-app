/**
 * Colors
 *
 * Map for switching color themes
 */

export const LIGHT = 'LIGHT';
export const DARK = 'DARK';

const themeMap = {
  DARK: {
    primary: '#e53935',
    background: {
      one: '#121212',
      two: '#1e1e1e',
      three: '#2a2a2a',
    },
    overlay: '#ffffff',
    text: {
      main: '#ffffff',
      alternate: '#121212',
      disabled: '#878787',
    },
  },
  LIGHT: {
    primary: '#e53935',
    background: {
      one: '#cfcfcf',
      two: '#e7e7e7',
      three: '#ffffff',
    },
    overlay: '#000000',
    text: {
      main: '#121212',
      alternate: '#ffffff',
      disabled: '#878787',
    },
  },
};

export default (theme) => themeMap[theme];
