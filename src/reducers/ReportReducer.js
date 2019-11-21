/**
 * Report Reducer
 *
 * Reducers to log most changes and actions on the app.
 */

import { combineReducers } from "redux";

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP, SET_LOCATION } from "../actions/types";

const initialState = {
  report: {}
};

const logEditName = (state, action) => {
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  const { payload } = action;
  const { location, name } = payload; 
  return {
    ...state,
    [time]: {
      time: time,
      log:`The ${location} group was renamed to ${name}`,
    }
  };
};

const logAddGroup = (state, action) => {
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  const { payload } = action;
	const { location } = payload;
  return {
    ...state,
    [time]: {
      time: time,
      log:`The ${location} group was added`,
    }
	};
	return state;
};

const logRemoveGroup = (state, action) => {
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();
  const time = `${hour}:${minute}:${second}`;
  const { payload } = action;
	const { location } = payload;
  return {
    ...state,
      [time]: {
        time: time,
        log: `The ${location} group was removed`,
      }
	};
	return state;
};

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
    default:
      return state;
  }
});