import uuidv4 from "uuid/v4";
import {
  ADD_PERSON,
  REMOVE_PERSON,
  SET_LOCATION,
  TOGGLE_SELECTED,
  CLEAR_SELECTED_PERSONNEL
} from "./types";
import { ROSTER } from "../reducers/locations";

export const addPerson = ({ badge, firstName, lastName, rank, shift }) => {
  const id = uuidv4();
  const location = ROSTER;
  return {
    type: ADD_PERSON,
    payload: { id, badge, firstName, lastName, location, rank, shift }
  };
};

export const removePersonById = id => ({
  type: REMOVE_PERSON,
  payload: { id }
});

export const setLocationById = (id, location) => ({
  type: SET_LOCATION,
  payload: { id, location }
});
