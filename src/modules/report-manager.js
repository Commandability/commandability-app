/**
 * reportManager module
 *
 * Generate incident reports from the report state and manage storage of all reports through AsyncStorage.
 */

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';

export const saveCurrentReport = async reportData => {
  try {
    const {
      currentUser: { uid },
    } = auth();
    const reportId = uuidv4();
    // Generate report string from data
    let reportString = '';
    if (reportData) {
      reportString += `Location: ${reportData['LOCATION']}\n`;
      if (reportData['NOTES']) {
        reportString += `Notes: ${reportData['NOTES']}\n`;
      } else {
        reportString += `Notes: none.\n`;
      }
      for (const entry in reportData) {
        const { dateTime, log } = reportData[entry];
        if (dateTime && log) {
          reportString += `${dateTime}: ${log}\n`;
        }
      }
    }
    await AsyncStorage.setItem(
      `@CAA/${uid}/reports/${reportId}`,
      reportString.trim()
    );
  } catch (error) {
    throw new Error(error);
  }
};

// avoid the promise constructor anti-pattern: a promise's then() clause always returns a new promise
// https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor/43050114
const getAllReportKeys = async () => {
  try {
    const {
      currentUser: { uid },
    } = auth();
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter(key => key.slice(0, 42) === `@CAA/${uid}/reports/`);
  } catch (error) {
    throw new Error(error);
  }
};

export const getNumberOfReports = async () => {
  try {
    const reportKeys = await getAllReportKeys();
    return reportKeys.length;
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

export const uploadReports = async () => {
  try {
    const reportKeys = await getAllReportKeys();
    const reportPromises = reportKeys.map(
      async key => await AsyncStorage.getItem(key)
    );
    const reports = await Promise.all(reportPromises);
    const {
      currentUser,
      currentUser: { uid },
    } = auth();
    if (currentUser) {
      const uploadPromises = reports.map(report => {
        const uploadId = uuidv4();
        const uploadPath = `/users/${uid}/${uploadId}`;
        let storageRef = storage().ref();
        let reportRef = storageRef.child(uploadPath);
        try {
          return reportRef.putString(report);
        } catch (error) {
          throw new Error(error);
        }
      });
      await Promise.all(uploadPromises);
    }
  } catch (error) {
    throw new Error(error);
  }
};
