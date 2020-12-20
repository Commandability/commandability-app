/**
 * All redux actions
 */

import {
  RESET_APP,
  RESET_INCIDENT,
  START_INCIDENT,
  END_INCIDENT,
  RESUME_INCIDENT,
} from './types';

import { INCIDENT_STACK, END_STACK } from '../modules/navigation-stacks';

export * from './groups/actions';
export * from './navigation/actions';
export * from './personnel/actions';
export * from './selected/actions';
export * from './theme/actions';

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
    payload: { entryId, dateTime, stack: INCIDENT_STACK, initialEpoch },
  };
};

export const endIncident = () => {
  const entryId = END_INCIDENT;
  const dateTime = new Date().toLocaleString();
  return {
    type: END_INCIDENT,
    payload: { entryId, dateTime, stack: END_STACK },
  };
};

export const resumeIncident = () => ({
  type: RESUME_INCIDENT,
  payload: { stack: INCIDENT_STACK },
});
