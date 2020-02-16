/**
 * reportManager module
 * Generate incident reports from the report state and manage storage of all reports through AsyncStorage.
 */

import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';
import { firebase } from '@react-native-firebase/storage';

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
    const reportId = uuidv4();
    
    await AsyncStorage.setItem(`@CAA:${reportId}`, reportString);
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

export const uploadReports = async () => {
  let storageRef = firebase.storage().ref('gs://commandability-1d375.appspot.com');
    const message = "Testing! Yay!";
    storageRef.putString(message).then(function(snapshot){

    });
};

export const backupReports = async () => {};
