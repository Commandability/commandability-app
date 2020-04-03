/**
 * reportManager module
 *
 * Generate incident reports from the report state and manage storage of all reports through AsyncStorage.
 */

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';

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
    const {
      currentUser: { uid },
    } = auth();
    const reportId = uuidv4();

    await AsyncStorage.setItem(`@CAA/${uid}/${reportId}`, getCurrentReportData());
  } catch (error) {
    throw new Error(error);
  }
};

// avoid the promise constructor anti-pattern: a promise's then() clause always returns a new promise
// https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor/43050114
export const getAllReportKeys = async () => {
  try {
    const {
      currentUser: { uid },
    } = auth();
    const keys = await AsyncStorage.getAllKeys();
    await keys;
    return keys.filter(key => key.slice(0, 34) === `@CAA/${uid}/`);
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
  try {
    const keys = await getAllReportKeys();
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

export const backupReports = async () => {
  try {
    const reportKeys = await getAllReportKeys();
    const reportPromises = reportKeys.map(key => getReport(key));
    const reports = await Promise.all(reportPromises);
    console.log(reports);
    const {
      currentUser,
      currentUser: { uid },
    } = auth();
    if (currentUser) {
      const uploadPromises = reports.map(report => {
        const newId = uuidv4();
        const uploadPath = `/@CAA/${uid}/${newId}`;
        console.log(uploadPath);
        let storageRef = storage().ref();
        let reportRef = storageRef.child(uploadPath);
        try { 
          return reportRef.putString(report);
        }
        catch (error){
          throw new Error(error);
        }
      });
      await Promise.all(uploadPromises);
      deleteAllReports();
    }
  } catch (error) {
    throw new Error(error);
  }
};
