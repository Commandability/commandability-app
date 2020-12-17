/**
 * Group Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import uuidv4 from 'uuid/v4';

import { EDIT_GROUP, TOGGLE_GROUP, CREATE_GROUP } from '../types';

export const editGroup = (group, settings) => {
  const entryId = uuidv4(); // for storage in the report reducer
  const dateTime = new Date().toLocaleString();
  const {
    name,
    // add additional settings here
  } = settings;

  return {
    type: EDIT_GROUP,
    payload: { entryId, dateTime, group, name },
  };
};

export const toggleGroup = group => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: TOGGLE_GROUP,
    payload: { entryId, dateTime, currTime: Date.now(), group },
  };
};

export const createGroup = (locationId, name, isVisible) => ({
  type: CREATE_GROUP,
  payload: { locationId, name, isVisible },
});
