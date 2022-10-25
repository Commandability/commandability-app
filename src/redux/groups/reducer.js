/**
 * Group Reducer
 */

import {
  EDIT_GROUP,
  ALERT_PERSON_TO_GROUP,
  DEALERT_PERSON_TO_GROUP,
  TOGGLE_GROUP,
  CONFIGURE_GROUPS,
  UPDATE_CONFIGURATION,
  RESET_INCIDENT,
} from '../types';
import {pageLocations} from '../../utils/locations';

const editGroup = (state, action) => {
  const {payload} = action;
  const {
    group,
    group: {locationId},
    settings,
  } = payload;

  return {
    ...state,
    [locationId]: {
      ...group,
      ...settings,
    },
  };
};

const alertPersonToGroup = (state, action) => {
  const {payload} = action;
  const {
    group,
    group: {locationId, alerted},
    person: {personId},
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
  const {payload} = action;
  const {
    group,
    group: {locationId},
    person: {personId},
  } = payload;

  return {
    ...state,
    [locationId]: {
      ...group,
      alerted: state[locationId].alerted.filter((id) => id !== personId),
    },
  };
};

const toggleGroup = (state, action) => {
  const {payload} = action;
  const {
    group,
    group: {locationId, isVisible},
  } = payload;
  return {
    ...state,
    [locationId]: {
      ...group,
      isVisible: !isVisible,
      alerted: [],
    },
  };
};

// Configure groups with app or loaded defaults
const configureGroups = (action) => {
  const {payload} = action;
  const {groups: defaultGroups} = payload;

  const groups = {};
  Object.keys(pageLocations).forEach((page) => {
    pageLocations[page].locationIds.forEach((locationId) => {
      const {
        name: defaultName,
        isVisible: defaultIsVisible,
        alert: defaultAlert,
      } = defaultGroups[locationId] ?? {};

      groups[locationId] = {
        locationId,
        name: defaultName?.toUpperCase() ?? locationId.replace(/_/g, ' '), // Replace underscore with space
        isVisible: defaultIsVisible ?? false,
        alert: defaultAlert ?? 0,
        alerted: [],
        defaultName:
          defaultName?.toUpperCase() ?? locationId.replace(/_/g, ' '), // Replace underscore with space
        defaultIsVisible: defaultIsVisible ?? false,
        defaultAlert: defaultAlert ?? 0,
      };
    });
  });

  return groups;
};

// Reset group settings to defaults
const resetIncident = (state) => {
  const groups = {};

  Object.keys(pageLocations).forEach((page) => {
    pageLocations[page].locationIds.forEach((locationId) => {
      const group = state[locationId];
      groups[locationId] = {
        ...group,
        name: state[locationId].defaultName,
        isVisible: state[locationId].defaultIsVisible,
        alert: state[locationId].defaultAlert,
        alerted: [],
      };
    });
  });

  return groups;
};

export const selectGroupByLocationId = (state, locationId) =>
  state?.[locationId];

export const selectGroups = (state) => state;

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
    case UPDATE_CONFIGURATION:
    case CONFIGURE_GROUPS:
      return configureGroups(action);
    case RESET_INCIDENT:
      return resetIncident(state);
    default:
      return state;
  }
};
