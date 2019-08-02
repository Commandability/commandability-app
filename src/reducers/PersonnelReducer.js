import { combineReducers } from "redux";
import { ADD_PERSONNEL, REMOVE_PERSONNEL } from "../actions/types";
import personnel from "./Personnel.json";

const personnelById = (state = {}, action) => {
  switch (action.type) {
    case ADD_PERSONNEL:
      return addPersonnel(state, action);
    case REMOVE_PERSONNEL:
      return state;
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

const personnelIds = (state = [], action) => {
  switch (action.type) {
    case ADD_PERSONNEL:
      return addPersonnelId(state, action);
    case REMOVE_PERSONNEL:
      return state;
    default:
      return state;
  }
};

const addPersonnelId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.concat(id);
};

export default combineReducers({
  byID: personnelById,
  allIds: personnelIds
});
