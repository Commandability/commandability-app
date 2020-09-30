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
} from '../types';

export const addPerson = (person, locationId, temporary = true) => {
  const id = uuidv4();
  const entryId = uuidv4(); // for storage in the report reducer
  const locationUpdateTime = 0;
  const dateTime = new Date().toLocaleString();
  return {
    type: ADD_PERSON,
    payload: {
      entryId,
      dateTime,
      person: { id, ...person, locationId, locationUpdateTime, temporary },
    },
  };
};

export const removePerson = person => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: REMOVE_PERSON,
    payload: { entryId, dateTime, person },
  };
};

export const setPersonLocationId = (
  person,
  prevLocationData,
  nextLocationData
) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  const currTime = Date.now();
  return {
    type: SET_PERSON_LOCATION_ID,
    payload: {
      entryId,
      dateTime,
      person,
      currTime,
      prevLocationData,
      nextLocationData,
    },
  };
};

export const clearPersonnel = () => ({
  type: CLEAR_PERSONNEL,
});
