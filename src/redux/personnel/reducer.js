/**
 * Personnel Reducer
 *
 * Reducers to add personnel, remove personnel, and change locationId.
 * Selectors to get personnel by locationId.
 */

import {
  ADD_PERSON,
  REMOVE_PERSON,
  CLEAR_PERSONNEL,
  MOVE_PERSON,
  TOGGLE_GROUP,
  RESET_INCIDENT,
} from '../types';
import { incidentLocations } from '../../modules/locations';

const { ROSTER, STAGING } = incidentLocations;

const initialState = {
  byId: {},
  allIds: [],
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return addPerson(state, action);
    case REMOVE_PERSON:
      return removePerson(state, action);
    case MOVE_PERSON:
      return movePerson(state, action);
    case CLEAR_PERSONNEL:
      return initialState.byId;
    default:
      return state;
  }
};

const addPerson = (state, action) => {
  const { payload } = action;
  const {
    person,
    person: { personId },
  } = payload;
  return {
    ...state,
    [personId]: {
      ...person,
    },
  };
};

const removePerson = (state, action) => {
  const { payload } = action;
  const {
    person: { personId },
  } = payload;

  // eslint-disable-next-line no-unused-vars
  const { [personId]: removed, ...updatedPersonnel } = state;
  return updatedPersonnel;
};

// set locationId of person by personId
const movePerson = (state, action) => {
  const { payload } = action;
  const {
    person: { personId },
    nextLocationData: { locationId },
    currTime,
  } = payload;
  const person = state[personId];
  return {
    ...state,
    [personId]: {
      ...person,
      locationId,
      locationUpdateTime: locationId === ROSTER.locationId ? 0 : currTime,
    },
  };
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return addPersonId(state, action);
    case REMOVE_PERSON:
      return removePersonId(state, action);
    case CLEAR_PERSONNEL:
      return initialState.allIds;
    default:
      return state;
  }
};

const addPersonId = (state, action) => {
  const { payload } = action;
  const {
    person: { personId },
  } = payload;
  return state.concat(personId);
};

const removePersonId = (state, action) => {
  const { payload } = action;
  const {
    person: { personId },
  } = payload;

  return state.filter(currId => currId != personId);
};

// set all locationIds in a group to staging if the group is deleted
const returnToStaging = (state, action) => {
  const {
    payload: {
      currTime,
      group: { locationId },
    },
  } = action;
  const byId = {};

  state.allIds.forEach(personId => {
    const person = state.byId[personId];
    if (person.locationId === locationId) {
      byId[personId] = {
        ...person,
        locationId: STAGING.locationId,
        locationUpdateTime: currTime,
      };
    } else {
      byId[personId] = {
        ...person,
      };
    }
  });
  return {
    byId,
    allIds: allIds(state.allIds, action),
  };
};

// set all groupIds to default and locationUpdateTime to 0 at end of incident
const resetIncident = state => {
  const byId = {};
  const allIds = [];
  state.allIds.forEach(personId => {
    const person = state.byId[personId];
    const { isTemporary } = person;
    // only add a person to the reset state if they weren't added during the incident
    if (!isTemporary) {
      byId[personId] = {
        ...person,
        locationId: ROSTER.locationId,
        locationUpdateTime: 0,
      };
      allIds.push(personId);
    }
  });
  return {
    byId,
    allIds,
  };
};

export const selectPersonnelAllIds = state => state.allIds;

export const selectPersonnelById = state => state.byId;

export const selectPersonById = (state, personId) => state.byId[personId];

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_INCIDENT:
      return resetIncident(state);
    case TOGGLE_GROUP: {
      // reset personnel locationId only if the group is being removed
      const {
        payload: { visibility },
      } = action;
      if (visibility) {
        break;
      } else {
        return returnToStaging(state, action);
      }
    }
  }
  return {
    byId: byId(state.byId, action),
    allIds: allIds(state.allIds, action),
  };
};
