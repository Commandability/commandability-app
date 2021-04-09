/**
 * Selectors index
 *
 * This file contains all redux selectors
 */

import {createSelector} from 'reselect';

import * as personnel from './personnel/selectors';
import * as groups from './groups/selectors';
import * as selected from './selected/selectors';

export * from './groups/selectors';
export * from './navigation/selectors';
export * from './personnel/selectors';
export * from './report/selectors';
export * from './selected/selectors';
export * from './theme/selectors';
export * from './timer/selectors';

// Selectors referencing multiple reducers

export const selectSelectedPersonnel = createSelector(
  selected.selectSelectedPersonnelIds,
  personnel.selectPersonnelById,
  (selectedPersonnelIds, personnelById) =>
    selectedPersonnelIds.map((personId) => personnelById[personId]),
);

export const selectIsConfigurationLoaded = createSelector(
  personnel.selectPersonnel,
  groups.selectGroups,
  (personnel, groups) =>
    Object.keys(groups).length > 1 || Object.keys(personnel) > 1,
);
