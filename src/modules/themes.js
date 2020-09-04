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
        three: '#353535',
      },
      overlay: '#ffffff',
      text: {
        main: '#e2e2e2',
        disabled: '#878787',
      },
    };
  } else {
    return {
      primary: '#e53935',
      background: {
        one: '#121212',
        two: '#1f1f1f',
        three: '#353535',
      },
      overlay: '#ffffff',
      text: {
        main: '#e2e2e2',
        disabled: '#878787',
      },
    };
  }
};
