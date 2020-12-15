/**
 * Selected Reducer
 *
 * Add and remove personnel from selected list, and set selected locationId
 * so that groups know when to disable their child incident items.
 */

import {
  TOGGLE_PERSON,
  SELECT_PERSON,
  DESELECT_PERSON,
  CLEAR_SELECTED_PERSONNEL,
  TOGGLE_GROUP,
  RESET_INCIDENT,
} from '../types';

const initialState = {
  personnelIds: [],
  locationId: '',
};

const personnelIds = (state = initialState.personnelIds, action) => {
  switch (action.type) {
    case TOGGLE_PERSON:
      return togglePerson(state, action);
    case SELECT_PERSON:
      return selectPerson(state, action);
    case DESELECT_PERSON:
      return deselectPerson(state, action);
    case TOGGLE_GROUP:
      return resetPersonnelIdsOnToggleGroup(state, action);
    case CLEAR_SELECTED_PERSONNEL:
    case RESET_INCIDENT:
      return [];
    default:
      return state;
  }
};

// Previously selected persons will be deselected
const togglePerson = (state, action) => {
  const {
    payload: { person },
  } = action;
  const { id } = person;

  if (state.includes(id)) {
    return state.filter(currId => currId != id);
  } else {
    return state.concat(id);
  }
};

// Previously selected persons will remain selected
const selectPerson = (state, action) => {
  const { payload } = action;
  const {
    person: { id },
  } = payload;

  if (state.includes(id)) {
    return state;
  } else {
    return state.concat(id);
  }
};

const deselectPerson = (state, action) => {
  const { payload } = action;
  const {
    person: { id },
  } = payload;

  return state.filter(currId => currId != id);
};

const resetPersonnelIdsOnToggleGroup = (state, action) => {
  // reset personnelIds only if a group is being removed
  const {
    payload: { visibility },
  } = action;
  if (visibility) {
    return state;
  } else {
    return [];
  }
};

const locationId = (state = initialState.locationId, action) => {
  switch (action.type) {
    case TOGGLE_PERSON:
      return selectLocationId(state, action);
    case TOGGLE_GROUP:
      return resetLocationIdOnToggleGroup(state, action);
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return '';
    default:
      return state;
  }
};

const selectLocationId = (state, action) => {
  const { payload } = action;
  const {
    locationId,
    person: { id },
  } = payload;

  // check if current id is the only id in selected to determine if locationId should be reset
  // and all locations should be enabled
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

const resetLocationIdOnToggleGroup = (state, action) => {
  // reset personnelIds only if a group is being removed
  const {
    payload: { visibility },
  } = action;
  if (visibility) {
    return state;
  } else {
    return '';
  }
};

export const selectSelectedPersonnelIds = state => {
  return state.personnelIds;
};

export const selectSelectedLocationId = state => {
  return state.locationId;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PERSON:
    case SELECT_PERSON:
    case DESELECT_PERSON:
      return selectLocationId(state, action);
    default:
      return {
        personnelIds: personnelIds(state.personnelIds, action),
        locationId: locationId(state.locationId, action),
      };
  }
};
