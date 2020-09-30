// Selected selectors

import * as selected from './reducer';

export const getSelectedLocationId = state =>
  selected.getSelectedLocationId(state.selected);

export const personIsSelected = (state, person) =>
  selected.personIsSelected(state.selected, person);

export const allPersonnelSelected = (state, personnel) =>
  personnel.every(person => personIsSelected(state, person));
