/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { EDIT_NAME, SET_VISIBILITY } from '../actions/types';

const editName = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId },
    newName,
  } = payload;
  return {
    ...state,
    [locationId]: {
      ...group,
      name: newName,
      visibility: true,
    },
  };
};

const setVisibility = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId },
    newVisibility
  } = payload;
  return {
    ...state,
    [locationId]: {
      ...group,
      visibility: newVisibility,
    },
  };
};

export const getGroupByLocationId = (state, locationId) => state[locationId];

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_NAME:
      return editName(state, action);
    case SET_VISIBILITY:
      return setVisibility(state, action);
    default:
      return state;
  }
};
