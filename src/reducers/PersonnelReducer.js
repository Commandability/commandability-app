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
  SET_PERSON_LOCATION_ID,
  SET_VISIBILITY,
  RESET_INCIDENT,
} from '../actions/types';
import { ROSTER } from '../modules/locationIds';

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
    case SET_PERSON_LOCATION_ID:
      return setPersonLocationId(state, action);
    case CLEAR_PERSONNEL:
      return undefined; // maybe initialstate.byId?
    default:
      return state;
  }
};

const addPerson = (state, action) => {
  const { payload } = action;
  const {
    log, // record if the person was added in an active incident
    person: {
      id,
      badge,
      firstName,
      lastName,
      rank,
      shift,
      locationId,
      groupUpdateEpochTime,
    },
  } = payload;
  return {
    ...state,
    [id]: {
      id,
      badge,
      firstName,
      lastName,
      rank,
      shift,
      locationId,
      groupUpdateEpochTime,
      log,
    },
  };
};

const removePerson = (state, action) => {
  const { payload } = action;
  const {
    log,
    person: { id },
  } = payload;

  // if added outside incident, only change location so that the person isn't removed from state
  if (!log) {
    const person = state[id];
    return {
      ...state,
      [id]: {
        ...person,
        locationId: '',
      },
    };
  }
  // otherwise remove from state
  else {
    // eslint-disable-next-line no-unused-vars
    const { [id]: removed, ...updatedPersonnel } = state;
    return updatedPersonnel;
  }
};

// set locationId of person by id
const setPersonLocationId = (state, action) => {
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
      groupUpdateEpochTime: locationId === ROSTER ? 0 : currTime,
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
      return undefined; // maybe initialstate.allIds?
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
    log,
    person: { id },
  } = payload;
  
  // if added outside incident, don't remove id
  if(!log){
    return state;
  }
  // otherwise remove id from state
  else{
    return state.filter(currId => currId != id);
  }
};

// set all groupIds in a group to roster if the group is deleted
const returnToRoster = (state, action) => {
  const {
    payload: {
      group: { locationId },
    },
  } = action;
  const byId = {};

  state.allIds.forEach(id => {
    const person = state.byId[id];
    if (person.locationId === locationId) {
      byId[id] = {
        ...person,
        locationId: ROSTER,
        groupUpdateEpochTime: 0,
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

// set all groupIds to default and groupUpdateEpochTime to 0 at end of incident
const resetIncident = state => {
  const byId = {};
  const allIds = [];
  state.allIds.forEach(id => {
    const person = state.byId[id];
    const { log } = person;
    // only add a person to the reset state if they weren't added during the incident
    if (!log) {
      byId[id] = {
        ...person,
        locationId: ROSTER,
        groupUpdateEpochTime: 0,
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

export const getPersonById = (state, id) => state.byId[id];

export const getPersonGroupUpdateTime = (state, person) => {
  const { id } = person;
  return state.byId[id].groupUpdateEpochTime;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_INCIDENT:
      return resetIncident(state);
    case SET_VISIBILITY: {
      // reset personnel locationId only if the group is being removed
      const {
        payload: { newVisibility },
      } = action;
      if (newVisibility) {
        break;
      } else {
        return returnToRoster(state, action);
      }
    }
  }
  return {
    byId: byId(state.byId, action),
    allIds: allIds(state.allIds, action),
  };
};
