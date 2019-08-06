import { combineReducers } from "redux";
import { ADD_PERSON, REMOVE_PERSON } from "../actions/types";
import * from "./locations";

const personnelById = (state = {}, action) => {
  switch (action.type) {
    case ADD_PERSONNEL:
      return addPerson(state, action);
    case REMOVE_PERSONNEL:
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
  const { id, ...updatedPersonnel } = state;
  return updatedPersonnel;
};

const personnelIds = (state = [], action) => {
  switch (action.type) {
    case ADD_PERSONNEL:
      return addPersonId(state, action);
    case REMOVE_PERSONNEL:
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
  }
}

export const getPersonnel = (state, personnelIds) => {
  return personnelIds.map(id => state.personnel.byId[id]);
}

export const getPersonnelIdsByLocation = (state, location) => {
  return state.personnel.allIds.filter(id => state.personnel.byId[id].location === location);
}

export default combineReducers({
  byID: personnelById,
  allIds: personnelIds
});
