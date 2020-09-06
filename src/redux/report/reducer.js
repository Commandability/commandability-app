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
} from '../types';
import { ROSTER } from '../../modules/location-ids';

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
  const {
    // eslint-disable-next-line no-unused-vars
    [END_INCIDENT]: removed,
    ...updatedReport
  } = state;
  return updatedReport;
};

const logAddPerson = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { firstName, lastName, badge, organization },
    log,
  } = payload;

  return log
    ? {
        ...state,
        [entryId]: {
          dateTime,
          log: `${badge ? badge + ' - ' : ''}${firstName} ${lastName} ${
            organization ? `(${organization}) ` : ''
          }added to incident`,
        },
      }
    : state; // return state if log is false
};

const logRemovePerson = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { firstName, lastName, badge, organization },
    log,
  } = payload;

  return log
    ? {
        ...state,
        [entryId]: {
          dateTime,
          log: `${badge ? badge + ' - ' : ''}${firstName} ${lastName} ${
            organization ? `(${organization}) ` : ''
          }removed from incident`,
        },
      }
    : state; // return state if log is false
};

const logSetLocationId = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { firstName, lastName, badge, organization },
    prevLocationData: { name: prevName, locationId: prevLocationId },
    nextLocationData: { name: nextName, locationId: nextLocationId },
  } = payload;

  let log = '';
  // Don't log adding and removing personnel here
  if (prevLocationId && nextLocationId) {
    if (prevLocationId === ROSTER) {
      log = `${
        badge ? badge + ' - ' : ''
      }${firstName} ${lastName} added to incident`;
    } else if (nextLocationId === ROSTER) {
      log = `${
        badge ? badge + ' - ' : ''
      }${firstName} ${lastName} removed from incident`;
    } else {
      log = `${badge ? badge + ' - ' : ''}${firstName} ${lastName} ${
        organization ? `(${organization}) ` : ''
      }moved from ${prevName} to ${nextName}`;
    }
  }

  return {
    ...state,
    [entryId]: {
      dateTime,
      log,
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

export const activeReport = state =>
  state[START_INCIDENT] && !state[END_INCIDENT];

export const completedReport = state => !!state[END_INCIDENT];

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
