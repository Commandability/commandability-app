/**
 * Selected Actions
 *
 * Actions to add and remove personnel from selected list.
 */

import {
  TOGGLE_SELECTED_PERSON,
  SELECT_PERSON,
  DESELECT_PERSON,
  CLEAR_SELECTED_PERSONNEL,
} from '../actions';

export const toggleSelectedPersonById = (id, locationId) => ({
  type: TOGGLE_SELECTED_PERSON,
  payload: { id, locationId },
});

export const selectPerson = (person, locationId) => ({
  type: SELECT_PERSON,
  payload: { person, locationId },
});

export const deselectPerson = (person, locationId) => ({
  type: DESELECT_PERSON,
  payload: { person, locationId },
});

export const clearSelectedPersonnel = () => ({
  type: CLEAR_SELECTED_PERSONNEL,
});