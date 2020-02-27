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
    const reportId = uuidv4();
    const reportString = `Report ID: ${reportId}\n${generateCurrentReport()}`;

    await AsyncStorage.setItem(`@CAA:${reportId}`, reportString);
  } catch (error) {
    throw new Error(error);
  }
};


// avoid the promise constructor anti-pattern: a promise's then() clause always returns a new promise
// https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor/43050114
export const getAllReportKeys = async () => {
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
  const keys = await getAllReportKeys();
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
  try {
    const reportKeys = await getAllReportKeys();
    const reportPromises = reportKeys.map(key => getReport(key));
    const reports = await Promise.all(reportPromises);
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const uploadPromises = reports.map(report => {
          const uploadId = report.substring(11,48);    
          let storageRef = firebase.storage().ref(`@CAA/${user.uid}/${uploadId}`);
          return storageRef.putString(report);
        });
        await Promise.all(uploadPromises);
        deleteAllReports();
      }
    });
  }
  catch (error) {
    throw new Error(error);
  }
};
