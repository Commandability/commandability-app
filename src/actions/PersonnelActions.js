import uuidv4 from "uuid/v4";
import { ADD_PERSON, REMOVE_PERSON, SET_LOCATION, SELECT_PERSON, DESELECT_PERSON, CLEAR_SELECTED_PERSONNEL } from "./types";
import { ROSTER } from "../reducers/locations";

export const addPersonnel = ({
  badge,
  firstName,
  lastName,
  rank,
  shift
}) => {
  const id = uuidv4();
  const location = ROSTER;
  return {
    type: ADD_PERSON,
    payload: { id, badge, firstName, lastName, location, rank, shift }
  };
};

export const removePersonnel = ({ id }) => ({
  type: REMOVE_PERSON,
  payload: { id }
});

export const setLocation = ({ id }, location) => ({
  type: SET_LOCATION,
  payload: { id, location }
});

export const selectPerson = ({ id }) => ({
  type: SELECT_PERSON,
  payload: { id }
});

export const deselectPerson = ({ id }) => ({
  type: DESELECT_PERSON,
  payload: { id }
});

export const clearSelectedPersonnel = () => ({
  type: CLEAR_SELECTED_PERSONNEL
});
