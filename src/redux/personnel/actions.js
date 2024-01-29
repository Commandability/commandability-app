/**
 * Personnel Actions
 */

import {v4 as uuidv4} from 'uuid';

import {
  ADD_PERSON,
  REMOVE_PERSON,
  MOVE_PERSON,
  CONFIGURE_PERSONNEL,
} from '../types';
import {staticLocations} from '../../utils/locations';
import {dateTimeFormat} from '../utils/report-manager';

const {ROSTER} = staticLocations;

export const addPerson = (person, locationId, isTemporary = true) => {
  const personId = uuidv4();
  const entryId = uuidv4(); // For storage in the report reducer
  const locationUpdateTime = 0;
  const dateTime = new Date().toLocaleString(dateTimeFormat);
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

export const removePerson = (person) => {
  const entryId = uuidv4(); // For storage in the report reducer
  const dateTime = new Date().toLocaleString(dateTimeFormat);
  return {
    type: REMOVE_PERSON,
    payload: {entryId, dateTime, person},
  };
};

export const movePerson = (person, prevLocationData, nextLocationData) => {
  const entryId = uuidv4(); // For storage in the report reducer
  const dateTime = new Date().toLocaleString(dateTimeFormat);
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

export const configurePersonnel = (personnel = []) => {
  const completedPersonnel = personnel.forEach((person) => ({
    personId: uuidv4(),
    locationId: ROSTER.locationId,
    locationUpdateTime: 0,
    isTemporary: false,
    ...person,
  }));

  return {
    type: CONFIGURE_PERSONNEL,
    payload: {personnel: completedPersonnel},
  };
};
