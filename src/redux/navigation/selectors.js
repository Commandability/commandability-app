// Navigation selectors

import * as navigation from './reducer';

export const getStack = state => navigation.getStack(state.navigation);
