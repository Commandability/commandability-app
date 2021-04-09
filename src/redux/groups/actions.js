/**
 * Group Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import {v4 as uuidv4} from 'uuid';

import {
  EDIT_GROUP,
  ALERT_PERSON_TO_GROUP,
  DEALERT_PERSON_TO_GROUP,
  TOGGLE_GROUP,
  CREATE_GROUPS,
} from '../types';

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
    payload: {entryId, dateTime, group, name, alert},
  };
};

export const alertPersonToGroup = (group, person) => {
  return {
    type: ALERT_PERSON_TO_GROUP,
    payload: {group, person},
  };
};

export const dealertPersonToGroup = (group, person) => {
  return {
    type: DEALERT_PERSON_TO_GROUP,
    payload: {group, person},
  };
};

export const toggleGroup = (group) => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: TOGGLE_GROUP,
    payload: {entryId, dateTime, currTime: Date.now(), group},
  };
};

export const createGroups = (groups) => ({
  type: CREATE_GROUPS,
  payload: {groups},
});
