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
  SET_PERSON_GROUP,
  EDIT_NAME,
  SET_VISIBILITY
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
  const {
    entryId,
    dateTime,
    person: { firstName, lastName },
  } = payload;

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
  const {
    entryId,
    dateTime,
    person: { firstName, lastName },
  } = payload;

  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `${firstName} ${lastName} removed from incident`,
    },
  };
};

const logSetGroup = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { firstName, lastName },
    prevGroup: { name: prevName },
    group: { name: currName },
  } = payload;

  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `${firstName} ${lastName} moved from ${prevName} to ${currName}`,
    },
  };
};

const logEditName = (state, action) => {
  const { payload } = action;
  const { group: { name }, newName, entryId, dateTime } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `Renamed group ${name} to ${newName}`,
    },
  };
};

const logSetVisibility = (state, action) => {
  const { payload } = action;
  const { group: { name }, newVisibility, entryId, dateTime } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: newVisibility ? `Added group ${name}` : `Removed group ${name}`,
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
    case SET_PERSON_GROUP:
      return logSetGroup(state, action);
    case EDIT_NAME:
      return logEditName(state, action);
    case SET_VISIBILITY:
      return logSetVisibility(state, action);
    default:
      return state;
  }
};
