import { Actions } from "react-native-router-flux";
import {
  MOVE_FIREFIGHTER,
  ADD_FIREFIGHTER,
  REMOVE_FIREFIGHTER,
  SHOW_GROUP,
  HIDE_GROUP,
  ADD_PAGE
} from "./types";

let prevId = 0
const generateId = (type) => {
  prevId += 1;
  return type + "-" + prevId;
}

export const moveFirefighter = ({ badge, firstName, lastName, rank, shift }, { id: prevGroupId }, { id: nextGroupId }) => ({
  type: MOVE_FIREFIGHTER,
  payload: { badge, firstName, lastName, rank, shift, prevGroupId, nextGroupId }
});

export const addFirefighter = ({ badge, firstName, lastName, rank, shift }) => {
  const id = generateId("firefighter");
  return {
    type: ADD_FIREFIGHTER,
    payload: { id, badge, firstName, lastName, rank, shift }
  }
}

export const removeFirefighter = ({ id }) => ({
  type: REMOVE_FIREFIGHTER,
  payload: id
});

export const showGroup = ({ id }) => ({
  type: SHOW_GROUP,
  payload: id
});

export const hideGroup = ({ id }}) => ({
  type: HIDE_GROUP,
  payload: id
});

export const addPage = () => ({
  type: ADD_PAGE
})
