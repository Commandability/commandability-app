import { combineReducers } from "redux";
import { ADD_PERSONNEL, REMOVE_PERSONNEL } from "../actions/types";

const personnelById = (state = {}, action) => {
  switch (action.type) {
    case ADD_PERSONNEL:
      return addPersonnel(state, action);
    case REMOVE_PERSONNEL:
      return removePersonnel(state, action);
    default:
      return state;
  }
};

const addPersonnel = (state, action) => {
  const { payload } = action;
  const { id, badge, firstName, lastName, rank, shift } = payload;
  return {
    ...state,
    [id]: {
      id,
      badge,
      firstName,
      lastName,
      rank,
      shift
    }
  };
};

const removePersonnel = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  const { id, ...updatedPersonnel } = state;
  return updatedPersonnel;
};

const personnelIds = (state = [], action) => {
  switch (action.type) {
    case ADD_PERSONNEL:
      return addPersonnelId(state, action);
    case REMOVE_PERSONNEL:
      return removePersonnelId(state, action);
    default:
      return state;
  }
};

const addPersonnelId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.concat(id);
};

const removePersonnelId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.filter(currId => currId != id);
};

export default combineReducers({
  byID: personnelById,
  allIds: personnelIds
});
