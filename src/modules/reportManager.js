/**
 * reportGenerator module
 *
 * Generate incident reports from the log state and manage storage of all reports.
 */

import AsyncStorage from "@react-native-community/async-storage";

import { store } from "../App.js";

// log state should include time stamps for each action
// create start report action that logs the report start time. This wil be used in the file name.
export const loadLatestReport = () => {
  const fileString = "";
  // getLog(store.getState()).forEach(() => {}); // append each action in log to filestring
};

export const saveLatestReport = () => {};

export const clearReports = () => {};

export const backupReports = () => {};
