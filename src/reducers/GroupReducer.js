/**
 * Group Reducer
 *
 * Reducers to add and remove groups, and change group names.
 */

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP } from "../actions/types";

const initialState = {
  group: {}
};

const editName = (state, action) => {
  const { payload } = action;
  const { location, name } = payload; 
  const group = state[location];
  return {
    ...state,
    [location]: {
      ...group,
      name,
      visibility: true
    }
  };
};

const addGroup = (state, action) => {
  const { payload } = action;
	const { location } = payload;
	const group = state[location];
  return {
		...state,
		[location]: {
      ...group,
			visibility: true
		}
	};
};

const removeGroup = (state, action) => {
  const { payload } = action;
	const { location } = payload;
	const group = state[location];
  return {
		...state,
		[location]: {
      ...group,
			visibility: false
		}
	};
};

export const getGroupByLocation = (state, location) => state[location];

export default (state = initialState, action) => {
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