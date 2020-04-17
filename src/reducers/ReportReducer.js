/**
 * Report Reducer
 *
 * Reducers to log incident changes.
 */

import {
  RESET_INCIDENT,
  START_INCIDENT,
  END_INCIDENT,
  RESUME_INCIDENT,
  ADD_PERSON,
  REMOVE_PERSON,
  SET_PERSON_LOCATION_ID,
  SET_NAME,
  SET_VISIBILITY,
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

const resumeIncident = state => {
  // eslint-disable-next-line no-unused-vars
  const { [Object.keys(state).slice(-1)[0]]: removed, ...updatedReport } = state;
  return updatedReport;
};

const logAddPerson = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { badge, firstName, lastName },
    log,
  } = payload;

  return log
    ? {
        ...state,
        [entryId]: {
          dateTime,
          log: `${badge ? badge + ' - ': ''}${firstName} ${lastName} added to incident`,
        },
      }
    : state; // return state if log is false
};

const logRemovePerson = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { badge, firstName, lastName },
    log,
  } = payload;

  return log
    ? {
        ...state,
        [entryId]: {
          dateTime,
          log: `${badge ? badge + ' - ': ''}${firstName} ${lastName} removed from incident`,
        },
      }
    : state; // return state if log is false
};

const logSetLocationId = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { badge, firstName, lastName },
    prevLocationData: { name: prevName },
    nextLocationData: { name: nextName },
  } = payload;

  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `${badge ? badge + ' - ': ''}${firstName} ${lastName} moved from ${prevName} to ${nextName}`,
    },
  };
};

const logSetName = (state, action) => {
  const { payload } = action;
  const {
    group: { name },
    newName,
    entryId,
    dateTime,
  } = payload;
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
  const {
    group: { name },
    newVisibility,
    entryId,
    dateTime,
  } = payload;
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
    case RESUME_INCIDENT:
      return resumeIncident(state);
    case RESET_INCIDENT:
      return {};
    case ADD_PERSON:
      return logAddPerson(state, action);
    case REMOVE_PERSON:
      return logRemovePerson(state, action);
    case SET_PERSON_LOCATION_ID:
      return logSetLocationId(state, action);
    case SET_NAME:
      return logSetName(state, action);
    case SET_VISIBILITY:
      return logSetVisibility(state, action);
    default:
      return state;
  }
};
