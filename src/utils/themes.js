/**
 * Colors
 *
 * Map for switching color themes
 */

export const LIGHT = 'LIGHT';
export const DARK = 'DARK';

const themeMap = {
  DARK: {
    primary: '#fff3c4',
    background: {
      one: '#27241d',
      two: '#423d33',
      three: '#504a40',
    },
    overlay: '#fff3c4',
    text: {
      main: '#faf9f7',
      alternate: '#121212',
      disabled: '#bbb2a7',
    },
  },
  LIGHT: {
    primary: '#b44d12',
    background: {
      one: '#d3cec4',
      two: '#e8e6e1',
      three: '#faf9f7',
    },
    overlay: '#8d2b0b',
    text: {
      main: '#27241d',
      alternate: '#faf9f7',
      disabled: '#625d52',
    },
  },
};

export default (theme) => themeMap[theme];
