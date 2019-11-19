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
  const { payload } = action;
  const { location, name, time } = payload; 
  return {
    ...state,
      log:"At "+time+", the "+location+" group was renamed to "+name,
  };
};

const logAddGroup = (state, action) => {
  const { payload } = action;
	const { location, time } = payload;
  return {
		...state,
      log:"At "+time+", a new "+location+" group was added",
	};
	return state;
};

const logRemoveGroup = (state, action) => {
  const { payload } = action;
	const { location, time } = payload;
  return {
    ...state,
			log: "At "+time+", a new "+location+" group was added",
	};
	return state;
};

export const getReport = (state) => {
  return Object.values(state);
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