/**
 * Selected Reducer
 *
 * Add and remove personnel from selected list, and set selected location
 * so that groups know when to disable their child list items.
 */

import { combineReducers } from "redux";
import { TOGGLE_SELECTED, CLEAR_SELECTED_PERSONNEL, RESET_INCIDENT } from "../actions/types";

const initialState = {
  ids: [],
  location: null
};

const ids = (state = initialState.ids, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED:
      return toggleSelectedById(state, action);
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return [];
    default:
      return state;
  }
};

const toggleSelectedById = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  if (state.indexOf(id) > -1) {
    return state.filter(currId => currId != id);
  } else {
    return state.concat(id);
  }
};

const location = (state = initialState.location, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED:
      return setLocation(state, action);
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return null;
    default:
      return state;
  }
};

const setLocation = (state, action) => {
  const { payload } = action;
  const { location, id } = payload;

  // check if current id is the only id in selected to determine if location should be reset
  // and all groups should be enabled
  if (state.ids.length == 1 && state.ids.indexOf(id) > -1) {
    return {
      ids: ids(state.ids, action),
      location: null
    };
  } else {
    return {
      ids: ids(state.ids, action),
      location
    };
  }
};

export const getSelectedIds = state => {
  return state.ids;
};

export const getSelectedLocation = state => {
  return state.location;
};

export default selected = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED:
      return setLocation(state, action);
    default:
      return {
        ids: ids(state.ids, action),
        location: location(state.location, action)
      };
  }
};
