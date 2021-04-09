/**
 * Personnel Actions
 *
 * Actions to add and remove personnel, and change current group.
 */

 import {v4 as uuidv4} from 'uuid';

import {
  ADD_PERSON,
  REMOVE_PERSON,
  MOVE_PERSON,
  CLEAR_PERSONNEL,
} from '../types';

export const addPerson = (person, locationId, isTemporary = true) => {
  const personId = uuidv4();
  const entryId = uuidv4(); // for storage in the report reducer
  const locationUpdateTime = 0;
  const dateTime = new Date().toLocaleString();
  return {
    type: ADD_PERSON,
    payload: {
      entryId,
      dateTime,
      person: {
        personId,
        ...person,
        locationId,
        locationUpdateTime,
        isTemporary,
      },
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

export const movePerson = (person, prevLocationData, nextLocationData) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  const currTime = Date.now();
  return {
    type: MOVE_PERSON,
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
