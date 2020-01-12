/**
 * Selected Actions
 *
 * Actions to add and remove personnel from selected list.
 */

import { TOGGLE_SELECTED_PERSON, CLEAR_SELECTED_PERSONNEL } from './types';

export const toggleSelectedPersonById = (id, location) => ({
  type: TOGGLE_SELECTED_PERSON,
  payload: { id, location },
});

export const clearSelectedPersonnel = () => ({
  type: CLEAR_SELECTED_PERSONNEL,
});
