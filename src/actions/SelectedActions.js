/**
 * Selected Actions
 *
 * Actions to add and remove personnel from selected list.
 */

import { TOGGLE_SELECTED_PERSON, CLEAR_SELECTED_PERSONNEL } from './types';

export const toggleSelectedPersonById = (id, groupId) => ({
  type: TOGGLE_SELECTED_PERSON,
  payload: { id, groupId },
});

export const clearSelectedPersonnel = () => ({
  type: CLEAR_SELECTED_PERSONNEL,
});
