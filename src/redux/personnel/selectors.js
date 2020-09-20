// Personnel selectors

import * as personnel from './reducer';

export const getPersonnelByLocationId = (state, locationId) =>
  personnel.getPersonnelByLocationId(state.personnel, locationId);

export const personnelInGroups = state =>
  personnel.personnelInGroups(state.personnel);

export const getLocationUpdateTime = (state, person) =>
  personnel.getLocationUpdateTime(state.personnel, person);
