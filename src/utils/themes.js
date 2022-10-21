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
    deemphasized: '#625d52',
    overlay: '#fff3c4',
    text: {
      main: '#faf9f7',
      alternate: '#27241d',
      disabled: '#d3cec4',
    },
  },
  LIGHT: {
    primary: '#8d2b0b',
    background: {
      one: '#d3cec4',
      two: '#e8e6e1',
      three: '#faf9f7',
    },
    deemphasized: '#d3cec4',
    overlay: '#8d2b0b',
    text: {
      main: '#27241d',
      alternate: '#faf9f7',
      disabled: '#625d52',
    },
  },
};

export default (theme) => themeMap[theme];
