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
  MOVE_PERSON,
  EDIT_GROUP,
  TOGGLE_GROUP,
} from '../types';
import { incidentLocations } from '../../modules/locations';

const { ROSTER, NEW_PERSONNEL, STAGING } = incidentLocations;

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

  return locationId === STAGING.locationId
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
const logMovePerson = (state, action) => {
  const { payload } = action;
  const {
    entryId,
    dateTime,
    person: { firstName, lastName, badge, organization },
    prevLocationData: { name: prevName, locationId: prevLocationId },
    nextLocationData: { name: nextName, locationId: nextLocationId },
  } = payload;

  let log = '';
  if (
    prevLocationId === NEW_PERSONNEL.locationId &&
    nextLocationId === STAGING.locationId
  ) {
    log = `${
      badge ? badge + ' - ' : ''
    }${firstName} ${lastName} added to incident`;
  } else if (
    prevLocationId === STAGING.locationId &&
    nextLocationId === ROSTER.locationId
  ) {
    log = `${
      badge ? badge + ' - ' : ''
    }${firstName} ${lastName} removed from incident`;
  } else {
    // Don't log people moving back to ROSTER from NEW_PERSONNEL or moving from ROSTER to NEW_PERSONNEL
    if (
      prevLocationId !== NEW_PERSONNEL.locationId &&
      nextLocationId !== ROSTER.locationId &&
      prevLocationId !== ROSTER.locationId &&
      nextLocationId !== NEW_PERSONNEL.locationId
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

const logToggleGroup = (state, action) => {
  const { payload } = action;
  const {
    group: { name },
    visibility,
    entryId,
    dateTime,
  } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: visibility ? `Added group ${name}` : `Removed group ${name}`,
    },
  };
};

export const selectReportData = state => state;

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
    case MOVE_PERSON:
      return logMovePerson(state, action);
    case EDIT_GROUP:
      return logSetName(state, action);
    case TOGGLE_GROUP:
      return logToggleGroup(state, action);
    default:
      return state;
  }
};
