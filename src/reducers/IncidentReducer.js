/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { TOGGLE_GROUP, SET_TOGGLE } from '../actions/types';

const toggleGroup = (state, action) => {
  const { flag } = action;
  return {
    ...state,
    toggle: flag,
  };
};

const setToggle = (state, action) => {
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
    case SET_TOGGLE:
      return setToggle(state, action);
    default:
      return state;
  }
};
