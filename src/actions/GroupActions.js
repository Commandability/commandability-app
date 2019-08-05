import { Actions } from "react-native-router-flux";
import uuidv4 from "uuid/v4";
import { ADD_GROUP, SET_NAME, SET_VISIBILITY, MOVE_PERSONNEL } from "./types";

export const addGroup = ({ name, personnel }) => {
  const id = uuidv4();
  return {
    type: ADD_GROUP,
    payload: { id, name, personnel }
  };
};

export const setName = ({ id, name }) => ({
  type: SET_NAME,
  payload: { id, name }
});

export const setVisibility = ({ id, visibility }) => ({
  type: SET_VISIBILITY,
  payload: { id, visibility }
});

export const movePersonnel = ( personnelId, prevGroupId, nextGroupId ) => ({
  type: MOVE_PERSONNEL,
  payload: { personnelId, prevGroupId, nextGroupId }
});
