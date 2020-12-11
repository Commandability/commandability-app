// Personnel selectors

import { createSelector } from 'reselect';

import * as personnel from './reducer';

export const selectPersonnel = state =>
  personnel.selectPersonnel(state.personnel);

export const selectPersonnelById = state =>
  personnel.selectPersonnelById(state.personnel);

// https://react-redux.js.org/api/hooks#useselector-examples
// https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances
export const createSelectPersonnelByPropLocationId = () => createSelector(
  selectPersonnel,
  (_, locationId) => locationId,
  (personnel, locationId) => personnel.filter(person => person.locationId === locationId)
);

// https://react-redux.js.org/api/hooks#useselector-examples
// https://github.com/reduxjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument
export const createSelectPersonnelByStaticLocationId = locationId => createSelector(
  selectPersonnel,
  personnel => personnel.filter(person => person.locationId === locationId)
);
