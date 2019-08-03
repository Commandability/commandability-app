import { combineReducers } from "redux";
import { MOVE_PERSONNEL, STAGE_PERSONNEL } from "../actions/types";

const groupsById = (state = {}, action) => {
  switch (action.type) {
    case MOVE_PERSONNEL:
      return movePersonnel();
    default:
      return state;
  }
};

const movePersonnel = (state, action) => {
  const { payload } = action;
  const { id, name, personnel } = payload; // additional information needed
};

const groupIds = (state = [], action) => {
  switch (action.type) {
    case MOVE_PERSONNEL:
      return movePersonnelId(state, action);
    default:
      return state;
  }
};

const movePersonnelId = (state, action) => {
  const { payload } = action;
  const { id, name, personnel } = payload; // additional information needed
};

export default combineReducers({
  byId: groupsById,
  allIds: allIds
});

