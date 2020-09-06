// Navigation selectors

import * as theme from './reducer';

export const getTheme = state => theme.getTheme(state.theme);
