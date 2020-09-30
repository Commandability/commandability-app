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
  REMOVE_PERSON,
  SET_PERSON_LOCATION_ID,
  SET_NAME,
  SET_VISIBILITY,
} from '../types';
import { ROSTER, NEW_PERSONNEL, STAGING } from '../../modules/location-ids';

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

// For temporary personnel
const logRemovePerson = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { locationId, firstName, lastName, badge, organization },
  } = payload;

  return locationId === STAGING
    ? {
        ...state,
        [entryId]: {
          dateTime,
          log: `${badge ? badge + ' - ' : ''}${firstName} ${lastName} ${
            organization ? `(${organization}) ` : ''
          }removed from incident`,
        },
      }
    : state;
};

// For incident personnel
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
  if (prevLocationId === NEW_PERSONNEL && nextLocationId === STAGING) {
    log = `${
      badge ? badge + ' - ' : ''
    }${firstName} ${lastName} added to incident`;
  } else if (prevLocationId === STAGING && nextLocationId === ROSTER) {
    log = `${
      badge ? badge + ' - ' : ''
    }${firstName} ${lastName} removed from incident`;
  } else {
    // Don't log people moving back to ROSTER from NEW_PERSONNEL or moving from ROSTER to NEW_PERSONNEL
    if (
      prevLocationId !== NEW_PERSONNEL &&
      nextLocationId !== ROSTER &&
      prevLocationId !== ROSTER &&
      nextLocationId !== NEW_PERSONNEL
    ) {
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
