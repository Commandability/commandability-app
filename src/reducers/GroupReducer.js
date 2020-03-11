/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { SET_NAME, SET_VISIBILITY, SET_GROUP } from '../actions/types';

const setName = (state, action) => {
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
    newVisibility,
  } = payload;
  return {
    ...state,
    [locationId]: {
      ...group,
      visibility: newVisibility,
    },
  };
};

const setGroup = (state, action) => {
  const { payload } = action;
  const { locationId, name, visibility } = payload;
  return {
    ...state,
    [locationId]: {
      locationId,
      name,
      visibility,
    },
  };
};

export const getGroupByLocationId = (state, locationId) => state[locationId];

export default (state = {}, action) => {
  switch (action.type) {
    case SET_NAME:
      return setName(state, action);
    case SET_VISIBILITY:
      return setVisibility(state, action);
    case SET_GROUP:
      return setGroup(state, action);
    default:
      return state;
  }
};
