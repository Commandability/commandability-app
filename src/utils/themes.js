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
      main: '#dddddd',
      alternate: '#121212',
      disabled: '#878787',
    },
  },
  LIGHT: {
    primary: '#b71c1c',
    background: {
      one: '#b4b4b4',
      two: '#d7d7d7',
      three: '#f5f5f5',
    },
    overlay: '#000000',
    text: {
      main: '#121212',
      alternate: '#dddddd',
      disabled: '#878787',
    },
  },
};

export default (theme) => themeMap[theme];
