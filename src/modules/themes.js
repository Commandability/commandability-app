/**
 * Colors module
 *
 * Store all colors used in app styling.
 */

export const LIGHT = 'LIGHT';
export const DARK = 'DARK';

const themeMap = {
  DARK: {
    primary: '#e53935',
    background: {
      one: '#121212',
      two: '#1f1f1f',
      three: '#2c2c2c',
    },
    overlay: '#ffffff',
    text: {
      main: '#ffffff',
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
      alternate: '#ffffff',
      disabled: '#878787',
    },
  }
};

export default theme => themeMap[theme];
