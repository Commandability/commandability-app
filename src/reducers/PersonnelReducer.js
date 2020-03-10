/**
 * Personnel Reducer
 *
 * Reducers to add personnel, remove personnel, and change groupId.
 * Selectors to get personnel by groupId.
 */

import {
  ADD_PERSON,
  REMOVE_PERSON,
  SET_PERSON_GROUP,
  SET_VISIBILITY,
  RESET_INCIDENT
} from '../actions/types';
import { ROSTER } from '../modules/groups';

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
    case SET_PERSON_GROUP:
      return setPersonGroup(state, action);
    default:
      return state;
  }
};

const addPerson = (state, action) => {
  const { payload } = action;
  const {
    person: {
      personId,
      badge,
      firstName,
      lastName,
      rank,
      shift,
      groupId,
      groupUpdateEpochTime,
    },
  } = payload;
  return {
    ...state,
    [personId]: {
      id: personId,
      badge,
      firstName,
      lastName,
      rank,
      shift,
      groupId,
      groupUpdateEpochTime,
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

// set groupId of person by id
const setPersonGroup = (state, action) => {
  const { payload } = action;
  const {
    person: { id },
    group: { groupId },
    currTime,
  } = payload;
  const person = state[id];
  return {
    ...state,
    [id]: {
      ...person,
      groupId,
      groupUpdateEpochTime: groupId === ROSTER ? 0 : currTime,
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

// set all groupIds in a group to roster if the group is deleted
const returnToRoster = (state, action) => {
  const { payload: { group: { groupId } } } = action;
  const byId = {};

  state.allIds.forEach(id => {
    const person = state.byId[id];
    if (person.groupId === groupId) {
      byId[id] = {
        ...person,
        groupId: ROSTER,
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
const resetIncident = (state, action) => {
  const byId = {};
  state.allIds.forEach(id => {
    const person = state.byId[id];
    byId[id] = {
      ...person,
      groupId: ROSTER,
      groupUpdateEpochTime: 0,
    };
  });
  return {
    byId,
    allIds: allIds(state.allIds, action),
  };
};

export const getPersonnelByGroup = (state, groupId) => {
  const personnelIdsByGroup = state.allIds.filter(
    id => state.byId[id].groupId === groupId
  );
  return personnelIdsByGroup.map(id => state.byId[id]);
};

export const getPersonById = (state, id) => state.byId[id];

export const getPersonGroupUpdateTime = (state, person) => {
  const { id } = person;
  return state.byId[id].groupUpdateEpochTime;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_INCIDENT:
      return resetIncident(state, action);
    case SET_VISIBILITY:
      // reset personnel groupId only if the group is being removed
      const { payload: { newVisibility } } = action;
      if(newVisibility){
        break;
      }
      else{
        return returnToRoster(state, action);
      }
  }
  return {
    byId: byId(state.byId, action),
    allIds: allIds(state.allIds, action),
  };
};
