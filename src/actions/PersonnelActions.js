/**
 * Personnel Actions
 *
 * Actions to add and remove personnel, and change location.
 */

import uuidv4 from "uuid/v4";

import {
  ADD_PERSON,
  REMOVE_PERSON,
  SET_LOCATION,
  RESET_INCIDENT,
  TOGGLE_SELECTED,
  CLEAR_SELECTED_PERSONNEL
} from "./types";
import { STAGING } from "../modules/locations";

export const addPerson = person => {
  const id = uuidv4();
  const location = STAGING;
  return {
    type: ADD_PERSON,
    payload: { ...person, id, location }
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

export const resetIncident = () => ({
  type: RESET_INCIDENT
});
