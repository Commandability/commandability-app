/**
 * Report Actions
 *
 * Actions to add and remove groups, and change group names.
 */

import { EDIT_NAME, ADD_GROUP, REMOVE_GROUP } from "./types";

export const logEditName = ({ location, name, time}) => {
  return {
    type: EDIT_NAME,
    payload: { location, name, time }
  };
};

export const logAddGroup = ({ location, time }) => {
  return {
    type: ADD_GROUP,
    payload: { location, time }
  };
};

export const logRemoveGroup = ({ location, time }) => {
  return {
    type: REMOVE_GROUP,
    payload: { location, time }
  };
};
