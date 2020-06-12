/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { TOGGLE_GROUP } from '../actions/types';

const toggleGroup = (state, action) => {
  const { flag } = action;
  return {
    ...state,
    toggle: flag,
  };
};

export const getToggleGroup = (state) => state.toggle;

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_GROUP:
      return toggleGroup(state, action);
    default:
      return state;
  }
};
