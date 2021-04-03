/**
 * Group Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import uuidv4 from 'uuid/v4';

import { EDIT_GROUP, ADD_GROUP_ALERT, REMOVE_GROUP_ALERT, TOGGLE_GROUP, CREATE_GROUPS } from '../types';

export const editGroup = (group, settings) => {
  const entryId = uuidv4(); // for storage in the report reducer
  const dateTime = new Date().toLocaleString();
  const {
    name,
    alert,
    // add additional settings here
  } = settings;

  return {
    type: EDIT_GROUP,
    payload: { entryId, dateTime, group, name, alert },
  };
};

export const addGroupAlert = (group, settings) => {
  const { 
    personId,
  } = settings;

  return {
    type: ADD_GROUP_ALERT,
    payload: { personId, group }
  };
};

export const removeGroupAlert = (group, settings) => {
  const { 
    personId,
  } = settings;

  return {
    type: REMOVE_GROUP_ALERT,
    payload: { personId, group }
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

export const createGroups = groups => ({
  type: CREATE_GROUPS,
  payload: { groups },
});
