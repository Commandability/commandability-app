/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { EDIT_GROUP, TOGGLE_GROUP, CREATE_GROUP } from '../types';

const editGroup = (state, action) => {
  const { payload } = action;
  const {
    group: { locationId },
    name,
  } = payload;
  return {
    ...state,
    [locationId]: {
      locationId,
      visibility: true,
      name
    },
  };
};

const toggleGroup = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId },
    visibility,
  } = payload;
  return {
    ...state,
    [locationId]: {
      ...group,
      visibility,
    },
  };
};

const createGroup = (state, action) => {
  const { payload } = action;
  const { locationId, name, visibility } = payload;
  return {
    ...state,
    [locationId]: {
      locationId,
      visibility,
      name,
    },
  };
};

export const selectGroupByLocationId = (state, locationId) => state[locationId];

export const selectGroups = state => state;

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_GROUP:
      return editGroup(state, action);
    case TOGGLE_GROUP:
      return toggleGroup(state, action);
    case CREATE_GROUP:
      return createGroup(state, action);
    default:
      return state;
  }
};
