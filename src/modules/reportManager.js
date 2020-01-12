/**
 * reportManager module
 * Generate incident reports from the report state and manage storage of all reports through AsyncStorage.
 */

import AsyncStorage from '@react-native-community/async-storage';

import { store } from '../App.js';
import { getCurrentReportData } from '../reducers';

export const generateCurrentReport = () => {
  const report = getCurrentReportData(store.getState());
  let reportString = '';
  if (report) {
    for (const entry in report) {
      const { dateTime, log } = report[entry];
      if (dateTime && log) {
        reportString += `${dateTime}: ${log}\n`;
      }
    }
  }
  return reportString.trim();
};

export const saveCurrentReport = async () => {
  try {
    const reportString = generateCurrentReport();
    const reportData = getCurrentReportData(store.getState());
    
    // get dateString from START_INCIDENT action
    const { dateTime } = reportData[Object.keys(reportData)[0]];
    
    await AsyncStorage.setItem(`@CAA:${dateTime}`, reportString);
  } catch (error) {
    throw new Error(error);
  }
};

// avoid the promise constructor anti-pattern: a promise's then() clause always returns a new promise
// https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor/43050114
export const getAllReports = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await keys;
    return keys.filter(key => key.slice(0, 5) === '@CAA:');
  } catch (error) {
    throw new Error(error);
  }
};

export const getReport = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllReports = async () => {
  const keys = await getAllReports();
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteReport = async report => {
  try {
    await AsyncStorage.removeItem(report);
  } catch (error) {
    throw new Error(error);
  }
};

export const backupReports = async () => {};
