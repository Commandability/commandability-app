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
    case CLEAR_SELECTED_PERSONNEL:
    case RESET_INCIDENT:
      return initialState.personnelIds;
    default:
      return state;
  }
};

// Previously selected persons will be deselected
const togglePerson = (state, action) => {
  const {
    payload: { person },
  } = action;
  const { personId } = person;

  if (state.includes(personId)) {
    return state.filter(currId => currId != personId);
  } else {
    return state.concat(personId);
  }
};

// Previously selected persons will remain selected
const selectPerson = (state, action) => {
  const { payload } = action;
  const {
    person: { personId },
  } = payload;

  if (state.includes(personId)) {
    return state;
  } else {
    return state.concat(personId);
  }
};

const deselectPerson = (state, action) => {
  const { payload } = action;
  const {
    person: { personId },
  } = payload;

  return state.filter(currId => currId != personId);
};

const locationId = (state = initialState.locationId, action) => {
  switch (action.type) {
    case TOGGLE_PERSON:
      return selectLocationId(state, action);
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return initialState.locationId;
    default:
      return state;
  }
};

const resetOnToggleGroup = (state, action) => {
  const {
    payload: { group: { locationId: selectedLocationId }, visibility },
  } = action;
  if (visibility) {
    return {
      personnelIds: personnelIds(state.personnelIds, action),
      locationId: locationId(state.locationId, action),
    };
  } else {
    // reset only if a group is being removed
    if(selectedLocationId === state.locationId){
      return {
        personnelIds: initialState.personnelIds,
        locationId: initialState.locationId,
      };
    } else {
      return {
        personnelIds: personnelIds(state.personnelIds, action),
        locationId: locationId(state.locationId, action),
      };
    }
  }
};

const selectLocationId = (state, action) => {
  const { payload } = action;
  const {
    locationId,
    person: { personId },
  } = payload;

  // check if current personId is the only personId in selected to determine if locationId should be reset
  // and all locations should be enabled
  if (
    state.personnelIds.length === 1 &&
    state.personnelIds.includes(personId)
  ) {
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

export const selectSelectedPersonnelIds = state => {
  return state.personnelIds;
};

export const selectSelectedLocationId = state => {
  return state.locationId;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_GROUP:
      return resetOnToggleGroup(state, action);
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
