/**
 * Personnel Actions
 *
 * Actions to add and remove personnel, and change current group.
 */

import uuidv4 from 'uuid/v4';

import {
  ADD_PERSON,
  REMOVE_PERSON,
  SET_PERSON_LOCATION_ID,
  CLEAR_PERSONNEL,
} from './types';
import { ROSTER } from '../modules/locationIds';

export const addPerson = (person, log = true) => {
  const id = uuidv4();
  const entryId = uuidv4(); // for storage in the report reducer
  const locationId = ROSTER;
  const groupUpdateEpochTime = 0;
  const dateTime = new Date().toLocaleString();
  return {
    type: ADD_PERSON,
    payload: {
      entryId,
      dateTime,
      person: { id, ...person, locationId, groupUpdateEpochTime },
      log,
    },
  };
};

export const removePerson = (person, log = true) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: REMOVE_PERSON,
    payload: { entryId, dateTime, person },
    log,
  };
};

export const setPersonLocationId = (
  person,
  prevLocationData,
  nextLocationData
) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: SET_PERSON_LOCATION_ID,
    payload: {
      entryId,
      dateTime,
      person,
      currTime: Date.now(),
      prevLocationData,
      nextLocationData,
    },
  };
};

export const clearPersonnel = () => ({
  type: CLEAR_PERSONNEL,
});
