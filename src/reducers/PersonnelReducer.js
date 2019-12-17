/**
 * Personnel Reducer
 *
 * Reducers to add personnel, remove personnel, and change location.
 * Selectors to get personnel by location.
 */

import {
  ADD_PERSON,
  REMOVE_PERSON,
  SET_LOCATION,
  RESET_INCIDENT,
  REMOVE_GROUP,
} from '../actions/types';
import { ROSTER } from '../modules/locations';

const initialState = {
  byId: {},
  allIds: [],
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return addPerson(state, action);
    case REMOVE_PERSON:
      return removePersonById(state, action);
    case SET_LOCATION:
      return setLocationById(state, action);
    default:
      return state;
  }
};

const addPerson = (state, action) => {
  const { payload } = action;
  const {
    id,
    badge,
    firstName,
    lastName,
    rank,
    shift,
    location,
    lastLocationUpdate,
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
      location,
      lastLocationUpdate,
    },
  };
};

const removePersonById = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  // eslint-disable-next-line no-unused-vars
  const { [id]: removed, ...updatedPersonnel } = state;
  return updatedPersonnel;
};

// set location of person by id
const setLocationById = (state, action) => {
  const { payload } = action;
  const { id, location } = payload;
  const person = state[id];
  return {
    ...state,
    [id]: {
      ...person,
      location,
      lastLocationUpdate: location === ROSTER ? 0 : Date.now(),
    },
  };
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return addPersonId(state, action);
    case REMOVE_PERSON:
      return removePersonId(state, action);
    default:
      return state;
  }
};

const addPersonId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.concat(id);
};

const removePersonId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.filter(currId => currId != id);
};

// set all locations in a group to roster if the group is deleted
const returnToRoster = (state, action) => {
  const { payload } = action;
  const { location } = payload;
  const byId = {};

  state.allIds.forEach(id => {
    const person = state.byId[id];
    if (person.location === location) {
      byId[id] = {
        ...person,
        location: 'Roster',
        lastLocationUpdate: 0,
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

// set all locations to default and lastLocationUpdate to 0 at end of incident
const resetIncident = (state, action) => {
  const byId = {};
  state.allIds.forEach(id => {
    const person = state.byId[id];
    byId[id] = {
      ...person,
      location: 'Roster',
      lastLocationUpdate: 0,
    };
  });
  return {
    byId,
    allIds: allIds(state.allIds, action),
  };
};

export const getPersonnelByLocation = (state, location) => {
  const personnelIdsByLocation = state.allIds.filter(
    id => state.byId[id].location === location
  );
  return personnelIdsByLocation.map(id => state.byId[id]);
};

export const getLastLocationUpdateById = (state, id) =>
  state.byId[id].lastLocationUpdate;

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_INCIDENT:
      return resetIncident(state, action);
    case REMOVE_GROUP:
      return returnToRoster(state, action);
    default:
      return {
        byId: byId(state.byId, action),
        allIds: allIds(state.allIds, action),
      };
  }
};
