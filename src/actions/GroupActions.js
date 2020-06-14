/**
 * Group Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import uuidv4 from 'uuid/v4';

import { SET_NAME, SET_VISIBILITY, SET_GROUP } from './types';

export const setName = (group, newName) => {
  const entryId = uuidv4(); // for storage in the report reducer
  const dateTime = new Date().toLocaleString();
  return {
    type: SET_NAME,
    payload: { entryId, dateTime, group, newName },
  };
};

export const setVisibility = (group, newVisibility) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: SET_VISIBILITY,
    payload: { entryId, dateTime, currTime: Date.now(), group, newVisibility },
  };
};

export const setGroup = (locationId, name, visibility) => ({
  type: SET_GROUP,
  payload: { locationId, name, visibility },
});
