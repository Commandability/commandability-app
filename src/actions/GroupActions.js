/**
 * Group Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP } from "./types";

export const editName = ({ location, name}) => {
  return {
    type: EDIT_NAME,
    payload: { location, name }
  };
};

export const addGroup = ({ location, visibility }) => {
  return {
    type: ADD_GROUP,
    payload: { location, visibility }
  };
};

export const removeGroup = ({ location, visibility }) => {
  return {
    type: REMOVE_GROUP,
    payload: { location, visibility }
  };
};
