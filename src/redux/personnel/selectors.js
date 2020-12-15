// Personnel selectors

import { createSelector } from 'reselect';

import * as personnel from './reducer';

export const selectPersonnelById = state =>
  personnel.selectPersonnelById(state.personnel);

export const selectPersonnelAllIds = state =>
  personnel.selectPersonnelAllIds(state.personnel);

export const selectPersonById = (state, id) =>
  personnel.selectPersonById(state.personnel, id);

export const selectPersonnel = createSelector(
  selectPersonnelAllIds,
  selectPersonnelById,
  (allIds, byId) => allIds.map(id => byId[id])
);

// https://react-redux.js.org/api/hooks#useselector-examples
// https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances
// https://github.com/reduxjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument
export const createSelectPersonnelByLocationId = locationId =>
  locationId
    ? createSelector(
        selectPersonnelAllIds,
        selectPersonnelById,
        (allIds, byId) =>
          allIds
            .map(id => byId[id])
            .filter(person => person.locationId === locationId)
      )
    : createSelector(
        selectPersonnelAllIds,
        selectPersonnelById,
        (_, locationId) => locationId,
        (allIds, byId, locationId) =>
          allIds
            .map(id => byId[id])
            .filter(person => person.locationId === locationId)
      );
