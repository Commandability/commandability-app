/**
 * App Actions
 *
 * Actions to handle general app state changes, and export all actions.
 */

import { RESET_APP } from './types';

export * from './PersonnelActions';
export * from './SelectedActions';
export * from './GroupActions';
export * from './IncidentActions';
export * from './UserAction';

export const resetApp = () => ({
  type: RESET_APP,
});
