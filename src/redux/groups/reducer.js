/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import {
  EDIT_GROUP,
  ADD_GROUP_ALERT,
  REMOVE_GROUP_ALERT,
  TOGGLE_GROUP,
  CREATE_GROUPS,
  RESET_INCIDENT,
} from '../types';
import { pageLocationIds } from '../../modules/locations.js';

const editGroup = (state, action) => {
  const { payload } = action;
  const {
    group: { locationId, alertCount, defaultName, defaultIsVisible, defaultAlert },
    name,
    alert
  } = payload;
  return {
    ...state,
    [locationId]: {
      locationId,
      isVisible: true,
      name,
      alert,
      alertCount,
      defaultName,
      defaultIsVisible,
      defaultAlert,
    },
  };
};

const addGroupAlert = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId, alertCount },
    personId,
  } = payload;

  return {
    ...state,
    [locationId]: {
      ...group,
      alertCount: [...alertCount, personId],
    },
  };
};

const removeGroupAlert = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId, alertCount },
    personId,
  } = payload;

  return {
    ...state,
    [locationId]: {
      ...group,
      alertCount: alertCount.filter(alertCount => alertCount.id !== personId),
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
      const { name: defaultName, isVisible: defaultIsVisible, alert: defaultAlert, alertCount: defaultAlertCount } = defaultGroups[
        locationId
      ];
      groups[locationId] = {
        locationId,
        name: defaultName,
        isVisible: defaultIsVisible,
        alert: defaultAlert,
        alertCount: defaultAlertCount,
        defaultName,
        defaultIsVisible,
        defaultAlert,
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
        alert: state[locationId].defaultAlert,
        alertCount: state[locationId].defaultAlertCount
      };
    });
  });

  return groups;
};

export const selectGroupByLocationId = (state, locationId) => 
locationId === "STAGING" ? null : state[locationId];

export const selectGroups = state => state;

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_GROUP:
      return editGroup(state, action);
    case ADD_GROUP_ALERT:
      return addGroupAlert(state, action);
    case REMOVE_GROUP_ALERT:
      return removeGroupAlert(state, action);
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
