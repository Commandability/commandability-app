/**
 * Selectors index
 *
 * This file contains all redux selectors
 */

import * as personnel from './personnel/reducer';
import * as groups from './groups/reducer';
import * as selected from './selected/reducer';

export * from './groups/selectors';
export * from './navigation/selectors';
export * from './personnel/selectors';
export * from './report/selectors';
export * from './timer/selectors';

export const configurationLoaded = state =>
  Boolean(
    personnel.configurationLoaded(state.personnel) ||
      groups.configurationLoaded(state.groups)
  );

export const getSelectedLocationId = state =>
  selected.getSelectedLocationId(state.selected);
// Selected personnel merged with their group objects
// If a person is in roster or staging, group is set to undefined
export const getSelectedPersonnelGroups = state =>
  selected
    .getSelectedIds(state.selected)
    .map(id => personnel.getPersonById(state.personnel, id))
    .map(person => ({
      person,
      group: groups.getGroupByLocationId(state.groups, person.locationId),
    }));
export const personIsSelected = (state, person) =>
  selected.personIsSelected(state.selected, person);
