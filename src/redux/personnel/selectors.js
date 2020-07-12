// Personnel selectors

import * as personnel from './reducer';

export const getPersonnelByLocationId = (state, locationId) =>
  personnel.getPersonnelByLocationId(state.personnel, locationId);
export const getPersonGroupUpdateTime = (state, person) =>
  personnel.getPersonGroupUpdateTime(state.personnel, person);
