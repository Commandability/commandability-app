/**
 * Colors module
 *
 * Store all colors used in app styling.
 */

import { DARK } from './theme-ids';

export default theme => {
  if (theme === DARK) {
    return {
      primary: '#e53935',
      background: {
        one: '#121212',
        two: '#1f1f1f',
        three: '#2c2c2c',
      },
      overlay: '#ffffff',
      text: {
        main: '#e2e2e2',
        disabled: '#878787',
      },
    };
  } else {
    return {
      primary: '#b72d2a',
      background: {
        one: '#d3d3d3',
        two: '#e0e0e0',
        three: '#ffffff',
      },
      overlay: '#000000',
      text: {
        main: '#121212',
        disabled: '#878787',
      },
    };
  }
};
