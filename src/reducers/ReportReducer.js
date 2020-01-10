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

const logEditName = (state, action, dateTime) => {
  const { payload } = action;
  const { location, name } = payload;
  return state.concat({
    dateTime,
    log: `Renamed group ${location} to ${name}`,
  });
};

const logAddGroup = (state, action, dateTime) => {
  const { payload } = action;
  const { location } = payload;
  return state.concat({
    dateTime,
    log: `Added group ${location}`,
  });
};

const logRemoveGroup = (state, action, dateTime) => {
  const { payload } = action;
  const { location } = payload;
  return state.concat({
    dateTime,
    log: `Removed group ${location}`,
  });
};

const logStartIncident = (state, dateTime) => {
  return [{
    dateTime,
    log: `Incident started`,
  }];
};

const logEndIncident = (state, dateTime) => {
  return state.concat({
    dateTime,
    log: `Incident ended`,
  });
};

export const getCurrentReportData = state => {
  return state.report;
};

export default (state = null, action) => {
  const dateTime = new Date().toLocaleString();

  switch (action.type) {
    case EDIT_NAME:
      return logEditName(state, action, dateTime);
    case ADD_GROUP:
      return logAddGroup(state, action, dateTime);
    case REMOVE_GROUP:
      return logRemoveGroup(state, action, dateTime);
    case START_INCIDENT:
      return logStartIncident(state, dateTime);
    case END_INCIDENT:
      return logEndIncident(state, dateTime);
    case RESET_INCIDENT:
      return null;
    default:
      return state;
  }
};
