/**
 * Personnel Actions
 *
 * Actions to add and remove personnel, and change location.
 */

import uuidv4 from 'uuid/v4';

import { ADD_PERSON, REMOVE_PERSON, SET_LOCATION } from './types';
import { STAGING } from '../modules/locations';

export const addPerson = person => {
  const id = uuidv4();
  const location = STAGING;
  const locationUpdateTime = 0;
  return {
    type: ADD_PERSON,
    payload: { ...person, id, location, locationUpdateTime },
  };
};

export const removePerson = person => ({
  type: REMOVE_PERSON,
  payload: { person },
});

export const setPersonLocation = (person, location) => ({
  type: SET_LOCATION,
  payload: { person, currTime: Date.now(), location },
});
