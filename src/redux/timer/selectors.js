// Time selectors

import * as timer from './reducer';

export const selectInitialEpoch = (state) =>
  timer.selectInitialEpoch(state.timer);
