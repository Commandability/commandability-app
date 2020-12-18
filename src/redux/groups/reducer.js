/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import {
  EDIT_GROUP,
  TOGGLE_GROUP,
  CREATE_GROUPS,
  RESET_INCIDENT,
} from '../types';
import { pageLocationIds } from '../../modules/locations.js';

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
      isVisible: true,
      name,
    },
  };
};

const toggleGroup = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId, isVisible },
  } = payload;
  return {
    ...state,
    [locationId]: {
      ...group,
      isVisible: !isVisible,
    },
  };
};

// Create groups with default settings
const createGroups = action => {
  const { payload } = action;
  const { groups: defaultGroups } = payload;

  const groups = {};
  Object.keys(pageLocationIds).forEach(page => {
    pageLocationIds[page].locationIds.forEach(locationId => {
      const { name: defaultName, isVisible: defaultIsVisible } = defaultGroups[
        locationId
      ];
      groups[locationId] = {
        locationId,
        name: defaultName,
        isVisible: defaultIsVisible,
        defaultName,
        defaultIsVisible,
      };
    });
  });

  return groups;
};

// Reset group settings to defaults
const resetIncident = state => {
  const groups = {};
  Object.keys(pageLocationIds).forEach(page => {
    pageLocationIds[page].locationIds.forEach(locationId => {
      const group = state[locationId];
      groups[locationId] = {
        ...group,
        name: state[locationId].defaultName,
        isVisible: state[locationId].defaultIsVisible,
      };
    });
  });

  return groups;
};

export const selectGroupByLocationId = (state, locationId) => state[locationId];

export const selectGroups = state => state;

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_GROUP:
      return editGroup(state, action);
    case TOGGLE_GROUP:
      return toggleGroup(state, action);
    case CREATE_GROUPS:
      return createGroups(action);
    case RESET_INCIDENT:
      return resetIncident(state);
    default:
      return state;
  }
};
