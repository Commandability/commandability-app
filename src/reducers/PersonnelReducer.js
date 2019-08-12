import { combineReducers } from "redux";
import {
  ADD_PERSON,
  REMOVE_PERSON,
  SET_LOCATION,
  TOGGLE_SELECTED,
  CLEAR_SELECTED_PERSONNEL
} from "../actions/types";

const byId = (state = {}, action) => {
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
  const personnel = state[id];
  return {
    ...state,
    [id]: {
      ...personnel,
      location
    }
  };
};

const allIds = (state = [], action) => {
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

export default combineReducers({
  byId,
  allIds
});
