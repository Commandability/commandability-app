/**
 * Personnel Reducer
 * 
 * Reducers to add and remove personnel, and change location.
 * Selectors to get personnel by location. 
 */

import { combineReducers } from "redux";

import {
  ADD_PERSON,
  REMOVE_PERSON,
  SET_LOCATION,
  RESET_LOCATIONS,
  TOGGLE_SELECTED,
  CLEAR_SELECTED_PERSONNEL
} from "../actions/types";
import { ROSTER } from "../modules/locations";

const initialState = {
  byId: {},
  allIds: []
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return addPerson(state, action);
    case REMOVE_PERSON:
      return removePerson(state, action);
    case SET_LOCATION:
      return setLocation(state, action);
    default:
      return state;
  }
};

const addPerson = (state, action) => {
  const { payload } = action;
  const { id, badge, firstName, lastName, rank, shift } = payload;
  return {
    ...state,
    [id]: {
      id,
      badge,
      firstName,
      lastName,
      location,
      rank,
      shift
    }
  };
};

const removePerson = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  const { [id]: removed, ...updatedPersonnel } = state;
  return updatedPersonnel;
};

const setLocation = (state, action) => {
  const { payload } = action;
  const { id, location } = payload;
  const person = state[id];
  return {
    ...state,
    [id]: {
      ...person,
      location
    }
  };
  return state;
};

// set all locations to default at end of incident
const resetLocations = (state, action) => {
  const byId = {};
  state.allIds.forEach(id => {
    const person = state.byId[id];
    byId[id] = {
      ...person,
      location: ROSTER
    };
  });
  return {
    byId,
    allIds: allIds(state.allIds, action)
  };
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return addPersonId(state, action);
    case REMOVE_PERSON:
      return removePersonId(state, action);
    default:
      return state;
  }
};

const addPersonId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.concat(id);
};

const removePersonId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.filter(currId => currId != id);
};

export const getPersonnelByLocation = (state, location) => {
  personnelIdsByLocation = state.allIds.filter(
    id => state.byId[id].location === location
  );
  return personnelIdsByLocation.map(id => state.byId[id]);
};

export default (personnel = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LOCATIONS:
      return resetLocations(state, action);
    default:
      return {
        byId: byId(state.byId, action),
        allIds: allIds(state.allIds, action)
      };
  }
});
