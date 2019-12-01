/**
 * Report Reducer
 *
 * Reducers to log most changes and actions on the app.
 */

import { combineReducers } from "redux";

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP, SET_LOCATION, RESET_INCIDENT, START_INCIDENT, END_INCIDENT } from "../actions/types";

import uuidv4 from "uuid/v4";

const initialState = {
  report: {}
};

const logEditName = (state, action) => {
  const id = uuidv4();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  const { payload } = action;
  const { location, name } = payload; 
  return {
    ...state,
    [id]: {
      time: time,
      log:`The ${location} group was renamed to ${name}`,
    }
  };
};

const logAddGroup = (state, action) => {
  const id = uuidv4();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  const { payload } = action;
	const { location } = payload;
  return {
    ...state,
    [id]: {
      time: time,
      log:`The ${location} group was added`,
    }
	};
	return state;
};

const logRemoveGroup = (state, action) => {
  const id = uuidv4();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  const { payload } = action;
	const { location } = payload;
  return {
    ...state,
      [id]: {
        time: time,
        log: `The ${location} group was removed`,
      }
	};
	return state;
};

const logResetIncident = (state, action) => {
  const id = uuidv4();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  state = undefined;
  return { 
    ...state,
    [id]: {
      time: time,
      log: 'The incident has been reset',
    } 
  };
  return state;
}

const logStartIncident = (state, action) => {
  const id = uuidv4();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  return {
    ...state,
      [id]: {
        time: time,
        log: `The incident has been started`,
      }
	};
	return state;
}

const logEndIncident = (state, action) => {
  const id = uuidv4();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  return {
    ...state,
      [id]: {
        time: time,
        log: `The incident has been ended`,
      }
	};
	return state;
}

export const getReport = (state) => {
  return state.report;
}

export default (report = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_NAME:
      return logEditName(state, action);
    case ADD_GROUP:
      return logAddGroup(state, action);
    case REMOVE_GROUP:
      return logRemoveGroup(state, action);
    case RESET_INCIDENT:
      return logResetIncident(state, action);
    case START_INCIDENT:
      return logStartIncident(state, action);
    case END_INCIDENT:
      return logEndIncident(state, action);
    default:
      return state;
  }
});