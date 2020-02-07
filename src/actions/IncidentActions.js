/**
 * Incident Actions
 *
 * Actions managing the state of the current incident.
 */

import uuidv4 from 'uuid/v4';

import { RESET_INCIDENT, START_INCIDENT, END_INCIDENT } from './types';

export const resetIncident = () => ({
  type: RESET_INCIDENT,
});

export const startIncident = () => {
  const entryId = uuidv4(); // for storage in the report reducer
  const dateTime = new Date().toLocaleString();
  return {
    type: START_INCIDENT,
    payload: { entryId, dateTime },
  };
};

export const endIncident = () => {
  const entryId = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: END_INCIDENT,
    payload: { entryId, dateTime },
  };
};