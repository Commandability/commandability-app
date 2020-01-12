/**
 * Group Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import uuidv4 from 'uuid/v4';

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP } from './types';

export const editName = ({ location, name }) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: EDIT_NAME,
    payload: { entryId, dateTime, location, name },
  };
};

export const addGroup = ({ location }) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: ADD_GROUP,
    payload: { entryId, dateTime, location },
  };
};

export const removeGroup = ({ location }) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: REMOVE_GROUP,
    payload: { entryId, dateTime, location },
  };
};
