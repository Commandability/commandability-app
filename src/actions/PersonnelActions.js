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
} from "./types";
import { STAGING } from "../modules/locations";

export const addPerson = person => {
  const id = uuidv4();
  const location = STAGING;
  const lastLocationUpdate = 0;
  return {
    type: ADD_PERSON,
    payload: { ...person, id, location, lastLocationUpdate }
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
