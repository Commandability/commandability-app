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
  TOGGLE_GROUP_MODE,
  CLEAR_SELECTED_GROUP_MODE,
  RESET_INCIDENT,
} from '../types';

const initialState = {
  personnelIds: [],
  locationId: '',
  groupMode: '',
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
    case RESET_INCIDENT:
    case CLEAR_SELECTED_PERSONNEL:
      return initialState.locationId;
    default:
      return state;
  }
};

const groupMode = (state = initialState.groupMode, action) => {
  switch (action.type) {
    case RESET_INCIDENT:
    case CLEAR_SELECTED_GROUP_MODE:
      return initialState.groupMode;
    default:
      return state;
  }
};

const selectLocationId = (state, action) => {
  const { payload } = action;
  const {
    person: { personId, locationId },
  } = payload;

  // Reset the selected locationId when the last selected person is deselected
  if (
    state.personnelIds.includes(personId) &&
    state.personnelIds.length === 1
  ) {
    return {
      personnelIds: personnelIds(state.personnelIds, action),
      locationId: initialState.locationId,
      groupMode: initialState.groupMode,
    };
    // Reset the groupMode when a person is added or removed
  } else {
    return {
      personnelIds: personnelIds(state.personnelIds, action),
      locationId,
      groupMode: '',
    };
  }
};

// Reset selected location and groups when a groupMode is selected
const toggleGroupMode = (state, action) => {
  const { payload } = action;
  const { groupMode } = payload;

  return {
    personnelIds: initialState.personnelIds,
    locationId: initialState.locationId,
    groupMode: state.groupMode && state.groupMode === groupMode ? '' : groupMode,
  };
};

export const selectSelectedPersonnelIds = state => {
  return state.personnelIds;
};

export const selectSelectedLocationId = state => {
  return state.locationId;
};

export const selectSelectedGroupMode = state => {
  return state.groupMode;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PERSON:
    case SELECT_PERSON:
    case DESELECT_PERSON:
      return selectLocationId(state, action);
    case TOGGLE_GROUP_MODE:
      return toggleGroupMode(state, action);
    default:
      return {
        personnelIds: personnelIds(state.personnelIds, action),
        locationId: locationId(state.locationId, action),
        groupMode: groupMode(state.groupMode, action),
      };
  }
};
