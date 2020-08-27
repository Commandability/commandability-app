/**
 * All redux actions and types
 */

export const RESET_APP = 'RESET_APP';
export const RESET_INCIDENT = 'RESET_INCIDENT';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const ADD_PERSON = 'ADD_PERSON';
export const REMOVE_PERSON = 'REMOVE_PERSON';
export const SET_PERSON_LOCATION_ID = 'SET_PERSON_LOCATION_ID';
export const CLEAR_PERSONNEL = 'CLEAR_PERSONNEL';

export const TOGGLE_SELECTED_PERSON = 'TOGGLE_SELECTED_PERSON';
export const SELECT_PERSON = 'SELECT_PERSON';
export const DESELECT_PERSON = 'DESELECT_PERSON';
export const CLEAR_SELECTED_PERSONNEL = 'CLEAR_SELECTED_PERSONNEL';

export const SET_NAME = 'SET_NAME';
export const SET_VISIBILITY = 'SET_VISIBILITY';
export const SET_GROUP = 'SET_GROUP';

export const START_INCIDENT = 'START_INCIDENT';
export const END_INCIDENT = 'END_INCIDENT';
export const RESUME_INCIDENT = 'RESUME_INCIDENT';
export const LOG_INCIDENT_DATA = 'LOG_INCIDENT_DATA';

export * from './groups/actions';
export * from './navigation/actions';
export * from './personnel/actions';
export * from './selected/actions';

export const resetApp = () => ({
  type: RESET_APP,
});

export const resetIncident = () => ({
  type: RESET_INCIDENT,
});

export const startIncident = initialEpoch => {
  const entryId = START_INCIDENT; // for storage in the report reducer
  const dateTime = new Date().toLocaleString();
  return {
    type: START_INCIDENT,
    payload: { entryId, dateTime, initialEpoch },
  };
};

export const endIncident = () => {
  const entryId = END_INCIDENT;
  const dateTime = new Date().toLocaleString();
  return {
    type: END_INCIDENT,
    payload: { entryId, dateTime },
  };
};

export const resumeIncident = () => ({
  type: RESUME_INCIDENT,
});

export const logIncidentData = (entryId, data) => {
  return {
    type: LOG_INCIDENT_DATA,
    payload: { entryId, data },
  };
};
