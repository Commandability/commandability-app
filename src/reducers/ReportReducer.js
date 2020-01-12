/**
 * Report Reducer
 *
 * Reducers to log incident changes.
 */

import {
  RESET_INCIDENT,
  START_INCIDENT,
  END_INCIDENT,
  ADD_PERSON,
  REMOVE_PERSON,
  SET_LOCATION,
  EDIT_NAME,
  ADD_GROUP,
  REMOVE_GROUP
} from '../actions/types';

const logStartIncident = action => {
  const { payload } = action;
  const { entryId, dateTime } = payload;
  return {
    [entryId]: {
      dateTime,
      log: `Incident started`,
    },
  };
};

const logEndIncident = (state, action) => {
  const { payload } = action;
  const { entryId, dateTime } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `Incident ended`,
    },
  };
};

const logAddPerson = (state, action) => {
  const { payload } = action;
  const { entryId, dateTime, person: { firstName, lastName } } = payload;

  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `${firstName} ${lastName} added to incident`,
    },
  };
};

const logRemovePerson = (state, action) => {
  const { payload } = action;
  const { entryId, dateTime, person: { firstName, lastName } } = payload;
  
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `${firstName} ${lastName} removed from incident`,
    },
  };
};

const logSetLocation = (state, action) => {
  const { payload } = action;
  const { entryId, dateTime, person: { firstName, lastName, location }, newLocation } = payload;
  
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `${firstName} ${lastName} moved from ${location} to ${newLocation}`,
    },
  };
};

const logEditName = (state, action) => {
  const { payload } = action;
  const { location, name, entryId, dateTime } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `Renamed group ${location} to ${name}`,
    },
  };
};

const logAddGroup = (state, action) => {
  const { payload } = action;
  const { location, entryId, dateTime } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `Added group ${location}`,
    },
  };
};

const logRemoveGroup = (state, action) => {
  const { payload } = action;
  const { location, entryId, dateTime } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `Removed group ${location}`,
    },
  };
};

export const activeReport = state => Object.keys(state).length > 1; // Inactive incidents have only the `_persist` property

export const getCurrentReportData = state => state;

export default (state = {}, action) => {
  switch (action.type) {
    case START_INCIDENT:
      return logStartIncident(action);
    case END_INCIDENT:
      return logEndIncident(state, action);
    case RESET_INCIDENT:
      return {};
    case ADD_PERSON: 
      return logAddPerson(state, action);
    case REMOVE_PERSON:
      return logRemovePerson(state, action);
    case SET_LOCATION:
      return logSetLocation(state, action);
    case EDIT_NAME:
      return logEditName(state, action);
    case ADD_GROUP:
      return logAddGroup(state, action);
    case REMOVE_GROUP:
      return logRemoveGroup(state, action);
    default:
      return state;
  }
};
