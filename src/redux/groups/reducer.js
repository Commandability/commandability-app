/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { SET_NAME, SET_VISIBILITY, INIT_GROUP } from '../types';

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

const initGroup = (state, action) => {
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

// When un-configured, groups will have only the `_persist` property
export const configurationLoaded = state => Object.keys(state).length > 1;

export default (state = {}, action) => {
  switch (action.type) {
    case SET_NAME:
      return setName(state, action);
    case SET_VISIBILITY:
      return setVisibility(state, action);
    case INIT_GROUP:
      return initGroup(state, action);
    default:
      return state;
  }
};
