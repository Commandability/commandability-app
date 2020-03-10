/**
 * Selected Reducer
 *
 * Add and remove personnel from selected list, and set selected groupId
 * so that groups know when to disable their child list items.
 */

import {
  TOGGLE_SELECTED_PERSON,
  CLEAR_SELECTED_PERSONNEL,
  RESET_INCIDENT,
} from '../actions/types';

const initialState = {
  personnelIds: [],
  groupId: '',
};

const personnelIds = (state = initialState.personnelIds, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_PERSON:
      return toggleSelectedPersonById(state, action);
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return [];
    default:
      return state;
  }
};

const toggleSelectedPersonById = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  if (state.includes(id)) {
    return state.filter(currId => currId != id);
  } else {
    return state.concat(id);
  }
};

const groupId = (state = initialState.groupId, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_PERSON:
      return setGroup(state, action);
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return '';
    default:
      return state;
  }
};

const setGroup = (state, action) => {
  const { payload } = action;
  const { groupId, id } = payload;

  // check if current id is the only id in selected to determine if groupId should be reset
  // and all groups should be enabled
  if (state.personnelIds.length == 1 && state.personnelIds.includes(id)) {
    return {
      personnelIds: personnelIds(state.personnelIds, action),
      groupId: '',
    };
  } else {
    return {
      personnelIds: personnelIds(state.personnelIds, action),
      groupId,
    };
  }
};

export const getSelectedIds = state => {
  return state.personnelIds;
};

export const getSelectedGroup = state => {
  return state.groupId;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_PERSON:
      return setGroup(state, action);
    default:
      return {
        personnelIds: personnelIds(state.personnelIds, action),
        groupId: groupId(state.groupId, action),
      };
  }
};
