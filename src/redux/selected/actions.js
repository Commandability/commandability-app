/**
 * Selected Actions
 *
 * Actions to add and remove personnel from selected list.
 */

import {
  TOGGLE_PERSON,
  SELECT_PERSON,
  DESELECT_PERSON,
  CLEAR_SELECTED_PERSONNEL,
  TOGGLE_GROUP_MODE,
  CLEAR_SELECTED_GROUP_MODE,
} from '../types';

// Previously selected persons will be deselected
export const togglePerson = (person) => ({
  type: TOGGLE_PERSON,
  payload: {person},
});

// Previously selected persons will remain selected
export const selectPerson = (person) => ({
  type: SELECT_PERSON,
  payload: {person},
});

export const deselectPerson = (person) => ({
  type: DESELECT_PERSON,
  payload: {person},
});

export const clearSelectedPersonnel = () => ({
  type: CLEAR_SELECTED_PERSONNEL,
});

export const toggleGroupMode = (groupMode) => ({
  type: TOGGLE_GROUP_MODE,
  payload: {groupMode},
});

export const clearSelectedGroupMode = () => ({
  type: CLEAR_SELECTED_GROUP_MODE,
});
