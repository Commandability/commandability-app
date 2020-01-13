/**
 * Personnel Actions
 *
 * Actions to add and remove personnel, and change location.
 */

import uuidv4 from 'uuid/v4';

import { ADD_PERSON, REMOVE_PERSON, SET_LOCATION } from './types';
import { STAGING } from '../modules/locations';

export const addPerson = person => {
  const personId = uuidv4();
  const entryId = uuidv4(); // for storage in the report reducer
  const location = STAGING;
  const locationUpdateTime = 0;
  const dateTime = new Date().toLocaleString();
  return {
    type: ADD_PERSON,
    payload: { entryId, dateTime, person: { personId, ...person, location, locationUpdateTime } },
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

export const setPersonLocation = (person, prevGroup, group) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: SET_LOCATION,
    payload: { entryId, dateTime, person, currTime: Date.now(), prevGroup, group },
  };
};
