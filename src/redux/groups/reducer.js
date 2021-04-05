/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import {
  EDIT_GROUP,
  ALERT_PERSON_TO_GROUP,
  DEALERT_PERSON_TO_GROUP,
  TOGGLE_GROUP,
  CREATE_GROUPS,
  RESET_INCIDENT,
} from '../types';
import { pageLocationIds } from '../../modules/locations.js';

const editGroup = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId },
    name,
    alert
  } = payload;

  return {
    ...state,
    [locationId]: {
      ...group,
      name,
      alert,
    },
  };
};

const alertPersonToGroup = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId, alerted },
    person: { personId },
  } = payload;

  if (alerted.includes(personId)) {
    return state;
  } else {
    return {
      ...state,
      [locationId]: {
        ...group,
        alerted: alerted.concat(personId),
      },
    };
  }
};

const dealertPersonToGroup = (state, action) => {
  const { payload } = action;
  const {
    group,
    group: { locationId },
    person: { personId },
  } = payload;

  return {
    ...state,
    [locationId]: {
      ...group,
      alerted: state[locationId].alerted.filter(id => id !== personId),
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
      const { name: defaultName, isVisible: defaultIsVisible, alert: defaultAlert } = defaultGroups[
        locationId
      ];
      groups[locationId] = {
        locationId,
        name: defaultName,
        isVisible: defaultIsVisible  ?? true,
        alert: defaultAlert ?? 0,
        alerted: [],
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
        alerted: []
      };
    });
  });

  return groups;
};

export const selectGroupByLocationId = (state, locationId) => state?.[locationId];

export const selectGroups = state => state;

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_GROUP:
      return editGroup(state, action);
    case ALERT_PERSON_TO_GROUP:
      return alertPersonToGroup(state, action);
    case DEALERT_PERSON_TO_GROUP:
      return dealertPersonToGroup(state, action);
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
