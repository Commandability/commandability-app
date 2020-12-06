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
import { ROSTER, NEW_PERSONNEL, STAGING } from '../../modules/location-ids';

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
    person: { id },
  } = payload;
  return {
    ...state,
    [id]: {
      ...person,
    },
  };
};

const removePerson = (state, action) => {
  const { payload } = action;
  const {
    person: { id },
  } = payload;

  // eslint-disable-next-line no-unused-vars
  const { [id]: removed, ...updatedPersonnel } = state;
  return updatedPersonnel;
};

// set locationId of person by id
const movePerson = (state, action) => {
  const { payload } = action;
  const {
    person: { id },
    nextLocationData: { locationId },
    currTime,
  } = payload;
  const person = state[id];
  return {
    ...state,
    [id]: {
      ...person,
      locationId,
      locationUpdateTime: locationId === ROSTER ? 0 : currTime,
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
    person: { id },
  } = payload;
  return state.concat(id);
};

const removePersonId = (state, action) => {
  const { payload } = action;
  const {
    person: { id },
  } = payload;

  return state.filter(currId => currId != id);
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

  state.allIds.forEach(id => {
    const person = state.byId[id];
    if (person.locationId === locationId) {
      byId[id] = {
        ...person,
        locationId: STAGING,
        locationUpdateTime: currTime,
      };
    } else {
      byId[id] = {
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
  state.allIds.forEach(id => {
    const person = state.byId[id];
    const { temporary } = person;
    // only add a person to the reset state if they weren't added during the incident
    if (!temporary) {
      byId[id] = {
        ...person,
        locationId: ROSTER,
        locationUpdateTime: 0,
      };
      allIds.push(id);
    }
  });
  return {
    byId,
    allIds,
  };
};

export const getPersonnelByLocationId = (state, locationId) => {
  const personnelIdsByLocation = state.allIds.filter(
    id => state.byId[id].locationId === locationId
  );
  return personnelIdsByLocation.map(id => state.byId[id]);
};

export const personnelInGroups = state => {
  return !state.allIds.every(
    id =>
      state.byId[id].locationId === ROSTER ||
      state.byId[id].locationId === NEW_PERSONNEL ||
      state.byId[id].locationId === STAGING
  );
};

export const getPersonById = (state, id) => state.byId[id];

export const getLocationUpdateTime = (state, person) => {
  const { id } = person;
  return state.byId[id].locationUpdateTime;
};

export const configurationLoaded = state =>
  Object.keys(state.byId).length || state.allIds.length;

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
