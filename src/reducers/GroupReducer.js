/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { combineReducers } from "redux";

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP } from "../actions/types";

const initialState = {
  group: {}
};

const editName = (state, action) => {
  const { payload } = action;
  const { location, name } = payload; 
  const group = state[location]
  return {
    ...state,
    [location]: {
      ...group,
      name
    }
  };
};

const addGroup = (state, action) => {
  const { payload } = action;
	const { location, visibility } = payload;
	const group = state[location]
  return {
		...state,
		[location]: {
			...group,
			visibility
		}
	};
	return state;
};

const removeGroup = (state, action) => {
  const { payload } = action;
	const { location, visibility } = payload;
	const group = state[location]
  return {
		...state,
		[location]: {
			...group,
			visibility
		}
	};
	return state;
};

export const getVisibilityByLocation = (state, location) => {
  return state[location].visibility;
};

export const getNameByLocation = (state, location) => {
  return state[location].name;
}

export default group = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_NAME:
      return editName(state, action);
    case ADD_GROUP:
      return addGroup(state, action);
    case REMOVE_GROUP:
      return removeGroup(state, action);
    default:
      return state;
  }
};