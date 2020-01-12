/**
 * Report Reducer
 *
 * Reducers to log incident changes.
 */

import {
  EDIT_NAME,
  ADD_GROUP,
  REMOVE_GROUP,
  RESET_INCIDENT,
  START_INCIDENT,
  END_INCIDENT,
} from '../actions/types';

const logEditName = (state, action) => {
  const { payload } = action;
  const { location, name, id, dateTime } = payload;
  return {
    ...state,
    [id]: {
      dateTime,
      log: `Renamed group ${location} to ${name}`,
    },
  };
};

const logAddGroup = (state, action) => {
  const { payload } = action;
  const { location, id, dateTime } = payload;
  return {
    ...state,
    [id]: {
      dateTime,
      log: `Added group ${location}`,
    },
  };
};

const logRemoveGroup = (state, action) => {
  const { payload } = action;
  const { location, id, dateTime } = payload;
  return {
    ...state,
    [id]: {
      dateTime,
      log: `Removed group ${location}`,
    },
  };
};

const logStartIncident = action => {
  const { payload } = action;
  const { id, dateTime } = payload;
  return {
    [id]: {
      dateTime,
      log: `Incident started`,
    },
  };
};

const logEndIncident = (state, action) => {
  const { payload } = action;
  const { id, dateTime } = payload;
  return {
    ...state,
    [id]: {
      dateTime,
      log: `Incident ended`,
    },
  };
};

export const reportIsActive = state => Object.keys(state).length > 1; // Inactive incidents have only the `_persist` property

export const getCurrentReportData = state => state;

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_NAME:
      return logEditName(state, action);
    case ADD_GROUP:
      return logAddGroup(state, action);
    case REMOVE_GROUP:
      return logRemoveGroup(state, action);
    case START_INCIDENT:
      return logStartIncident(action);
    case END_INCIDENT:
      return logEndIncident(state, action);
    case RESET_INCIDENT:
      return {};
    default:
      return state;
  }
};
