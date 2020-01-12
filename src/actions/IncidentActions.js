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
  const id = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: START_INCIDENT,
    payload: { id, dateTime },
  };
};

export const endIncident = () => {
  const id = uuidv4();
  const dateTime = new Date().toLocaleString();
  return {
    type: END_INCIDENT,
    payload: { id, dateTime },
  };
};
