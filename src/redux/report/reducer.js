/**
 * Report Reducer
 *
 * Log actions to be used in the report
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
  ALERT_PERSON_TO_GROUP,
} from '../types';
import {staticLocations} from '../../utils/locations';

const {ROSTER, NEW_PERSONNEL, STAGING} = staticLocations;

const logStartIncident = (action) => {
  const {payload} = action;
  const {entryId, dateTime} = payload;
  return {
    [entryId]: {
      dateTime,
      log: 'Incident started',
    },
  };
};

const logEndIncident = (state, action) => {
  const {payload} = action;
  const {entryId, dateTime} = payload;
  // Only log end incident if there is not an end incident entry
  return state[entryId]
    ? state
    : {
        ...state,
        [entryId]: {
          dateTime,
          log: 'Incident ended',
        },
      };
};

const resumeIncident = (state) => {
  const {[END_INCIDENT]: removed, ...updatedReport} = state;
  return updatedReport;
};

// For temporary personnel
const logRemovePerson = (state, action) => {
  const {payload} = action;
  const {
    entryId,
    dateTime,
    person: {locationId, firstName, lastName, badge, organization},
  } = payload;

  // Only log if removed from staging
  return locationId === STAGING.locationId
    ? {
        ...state,
        [entryId]: {
          dateTime,
          log: `${badge ? badge + ' - ' : ''}${firstName} ${lastName}${
            organization ? ` (${organization}) ` : ' '
          }removed from incident`,
        },
      }
    : state;
};

// For incident personnel
const logMovePerson = (state, action) => {
  const {payload} = action;
  const {
    entryId,
    dateTime,
    person: {firstName, lastName, badge, organization},
    prevLocationData: {name: prevName, locationId: prevLocationId},
    nextLocationData: {name: nextName, locationId: nextLocationId},
  } = payload;

  let log = '';
  if (
    prevLocationId === NEW_PERSONNEL.locationId &&
    nextLocationId === STAGING.locationId
  ) {
    log = `${badge ? badge + ' - ' : ''}${firstName} ${lastName}${
      organization ? ` (${organization}) ` : ' '
    } added to incident`;
  } else if (
    prevLocationId === STAGING.locationId &&
    nextLocationId === ROSTER.locationId
  ) {
    // Does not include organization because added personnel are removed via removePerson, not movePerson
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
      log = `${badge ? badge + ' - ' : ''}${firstName} ${lastName}${
        organization ? `( ${organization}) ` : ' '
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

const logEditGroup = (state, action) => {
  const {payload} = action;
  const {
    group: {name},
    settings: {name: newName, alert: newAlert},
    entryId,
    dateTime,
  } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      log: `Edited group ${name} settings: 
      [
        ${newName ? ` name: ${newName}, ` : ''}
        ${
          newAlert || newAlert === 0
            ? newAlert === 0
              ? ' alert: disabled, '
              : ` alert: ${newAlert}, `
            : ''
        }
      ]`,
    },
  };
};

const logToggleGroup = (state, action) => {
  const {payload} = action;
  const {
    group: {name, isVisible},
    entryId,
    dateTime,
  } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      // If isVisible is currently true, it is being toggled to false
      log: isVisible ? `Removed group ${name}` : `Added group ${name}`,
    },
  };
};

const logAlertPersonToGroup = (state, action) => {
  const {payload} = action;
  const {
    person: {firstName, lastName, badge, organization},
    group: {alert},
    entryId,
    dateTime,
  } = payload;
  return {
    ...state,
    [entryId]: {
      dateTime,
      // If isVisible is currently true, it is being toggled to false
      log: `Alert at ${alert} minutes for ${
        badge ? badge + ' - ' : ''
      }${firstName} ${lastName}${organization ? ` (${organization}) ` : ''}`,
    },
  };
};

export const selectReportData = (state) => state;

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
      return logEditGroup(state, action);
    case TOGGLE_GROUP:
      return logToggleGroup(state, action);
    case ALERT_PERSON_TO_GROUP:
      return logAlertPersonToGroup(state, action);
    default:
      return state;
  }
};
