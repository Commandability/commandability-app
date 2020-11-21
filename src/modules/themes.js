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
        alternate: '#121212',
        disabled: '#878787',
      },
    };
  } else {
    return {
      primary: '#9b0000',
      background: {
        one: '#B4b4b4',
        two: '#d7d7d7',
        three: '#f5f5f5',
      },
      overlay: '#000000',
      text: {
        main: '#121212',
        disabled: '#878787',
        alternate: '#f5f5f5',
      },
    };
  }
};
