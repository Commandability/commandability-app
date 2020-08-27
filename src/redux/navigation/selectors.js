// Navigation selectors

import * as navigation from './reducer';

export const getAuthStatus = state => navigation.getAuthStatus(state.navigation);