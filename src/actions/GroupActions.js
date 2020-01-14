/**
 * Group Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import uuidv4 from 'uuid/v4';

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP } from './types';

export const editName = (group, newName) => {
  const entryId = uuidv4(); // for storage in the report reducer
  const dateTime = new Date().toLocaleString();
  return {
    type: EDIT_NAME,
    payload: { entryId, dateTime, group, newName },
  };
};

export const addGroup = group => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: ADD_GROUP,
    payload: { entryId, dateTime, group },
  };
};

export const removeGroup = group => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: REMOVE_GROUP,
    payload: { entryId, dateTime, group },
  };
};
