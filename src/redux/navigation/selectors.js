// Navigation selectors

import * as navigation from './reducer';

export const selectStack = state => navigation.selectStack(state.navigation);
