/**
 * Incident Actions
 *
 * 
 */

import { RESET_INCIDENT, START_INCIDENT, END_INCIDENT } from "./types";

export const resetIncident = () => {
  return {
    type: RESET_INCIDENT,
  };
};

export const startIncident = () => {
  return {
    type: START_INCIDENT,
  };
};

export const endIncident = () => {
  return {
    type: END_INCIDENT,
  };
};
