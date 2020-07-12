// Time selectors

import * as timer from './reducer';

export const getInitialEpoch = state => timer.getInitialEpoch(state.timer);
