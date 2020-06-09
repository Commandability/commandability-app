/**
 * Selected Reducer
 *
 * Add and remove personnel from selected list, and set selected locationId
 * so that groups know when to disable their child list items.
 */

import {
  TOGGLE_SELECTED_PERSON,
  SELECT_PERSON, 
  DESELECT_PERSON,
  CLEAR_SELECTED_PERSONNEL,
  SET_VISIBILITY,
  RESET_INCIDENT,
} from '../actions/types';

const initialState = {
  personnelIds: [],
  locationId: '',
};

const personnelIds = (state = initialState.personnelIds, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_PERSON:
      return toggleSelectedPersonById(state, action);
    case SELECT_PERSON:
      return selectPerson(state, action);
    case DESELECT_PERSON:
      return deselectPerson(state, action);
    case SET_VISIBILITY:
      return resetPersonnelIdsOnSetVisibility(state, action);
    case CLEAR_SELECTED_PERSONNEL:
    case RESET_INCIDENT:
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

const selectPerson = (state, action) => {
  const { payload } = action;
  const { person: { id } } = payload;

  if (state.includes(id)) {
    return state;
  }
  else{
    return state.concat(id);
  }
};

const deselectPerson = (state, action) => {
  const { payload } = action;
  const { person: { id } } = payload;

  return state.filter(currId => currId != id);
};

const resetPersonnelIdsOnSetVisibility = (state, action) => {
  // reset personnelIds only if the group is being removed
  const {
    payload: { newVisibility },
  } = action;
  if (newVisibility) {
    return state;
  } else {
    return [];
  }
};

const locationId = (state = initialState.locationId, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_PERSON:
      return setGroup(state, action);
    case SET_VISIBILITY:
      return resetLocationIdOnSetVisibility(state, action);
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return '';
    default:
      return state;
  }
};

const setGroup = (state, action) => {
  const { payload } = action;
  const { locationId, id } = payload;

  // check if current id is the only id in selected to determine if locationId should be reset
  // and all groups should be enabled
  if (state.personnelIds.length === 1 && state.personnelIds.includes(id)) {
    return {
      personnelIds: personnelIds(state.personnelIds, action),
      locationId: '',
    };
  } else {
    return {
      personnelIds: personnelIds(state.personnelIds, action),
      locationId,
    };
  }
};

const resetLocationIdOnSetVisibility = (state, action) => {
  // reset personnelIds only if the group is being removed
  const {
    payload: { newVisibility },
  } = action;
  if (newVisibility) {
    return state;
  } else {
    return '';
  }
};

export const getSelectedIds = state => {
  return state.personnelIds;
};

export const getSelectedLocationId = state => {
  return state.locationId;
};

export const personIsSelected = (state, person) => {
  const { id } = person;
  return state.personnelIds.includes(id);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_PERSON:
    case SELECT_PERSON:
    case DESELECT_PERSON:
      return setGroup(state, action);
    default:
      return {
        personnelIds: personnelIds(state.personnelIds, action),
        locationId: locationId(state.locationId, action),
      };
  }
};
