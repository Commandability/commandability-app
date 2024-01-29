/**
 * Report manager
 *
 * Generate incident reports from the report state and manage storage of all reports through AsyncStorage
 */

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';

export const dateTimeFormat = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export const DEVICE_REPORT_LIMIT = 10;

export const generateReportString = (reportData) => {
  // Generate report string from data
  let reportString = '';
  if (reportData) {
    if (reportData.EMERGENCY_UPLOAD) {
      reportString += `${reportData.EMERGENCY_UPLOAD}\n`;
    } else {
      reportString += `Location: ${reportData.LOCATION}\n`;
      if (reportData.DESCRIPTION) {
        reportString += `Description: ${reportData.DESCRIPTION}\n`;
      } else {
        reportString += 'Description: none\n';
      }
    }

    for (const entry in reportData) {
      const {dateTime, log} = reportData[entry];
      if (dateTime && log) {
        reportString += `${dateTime}: ${log}\n`;
      }
    }
  }
  const report = reportString.trim();

  return report;
};

// Avoid the promise constructor anti-pattern: a promise's then() clause always returns a new promise
// https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor/43050114
const getAllReportKeys = async () => {
  try {
    const {
      currentUser: {uid},
    } = auth();
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter((key) => key.slice(0, 42) === `@CAA/${uid}/reports/`);
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

export const saveReport = async (reportData) => {
  try {
    const {
      currentUser: {uid},
    } = auth();
    const saveId = uuidv4();

    // Save report data
    await AsyncStorage.setItem(
      `@CAA/${uid}/reports/${saveId}`,
      JSON.stringify(reportData),
    );
  } catch (error) {
    throw new Error(error);
  }
};

const getReportStartDateTime = (reportData) => {
  for (const entry in reportData) {
    const {dateTime, log} = reportData[entry];
    if (log === 'Incident started') {
      return dateTime;
    }
  }
};

export const uploadReport = async (reportData) => {
  try {
    const {
      currentUser: {uid},
    } = auth();
    const uploadId = uuidv4();

    const reportString = generateReportString(reportData);

    // Upload report
    const uploadPath = `/users/${uid}/reports/${uploadId}`;
    let storageRef = storage().ref();
    let reportRef = storageRef.child(uploadPath);
    await reportRef.putString(reportString);

    // Upload report firestore metadata
    if (!reportData.EMERGENCY_UPLOAD) {
      await firestore()
        .collection('users')
        .doc(uid)
        .collection('reports-metadata')
        .doc(uploadId)
        .set({
          location: reportData.LOCATION,
          startTimestamp: firestore.Timestamp.fromDate(
            new Date(getReportStartDateTime(reportData)),
          ),
        });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadReports = async () => {
  try {
    const reportKeys = await getAllReportKeys();
    const reportDataPromises = reportKeys.map((key) =>
      AsyncStorage.getItem(key),
    );
    const serializedReportsData = await Promise.all(reportDataPromises);
    const deserializedReportsData = serializedReportsData.map(
      (serializedReportData) => JSON.parse(serializedReportData),
    );

    const {
      currentUser,
      currentUser: {uid},
    } = auth();
    if (currentUser) {
      const uploadPromises = deserializedReportsData.flatMap((reportData) => {
        const reportString = generateReportString(reportData);

        const uploadId = uuidv4();

        // Upload reports
        const uploadPath = `/users/${uid}/reports/${uploadId}`;
        const reportPromise = storage()
          .ref()
          .child(uploadPath)
          .putString(reportString);

        // Upload reports' firestore metadata
        const reportFirestoreMetadataPromise = firestore()
          .collection('users')
          .doc(uid)
          .collection('reports-metadata')
          .doc(uploadId)
          .set({
            location: reportData.LOCATION,
            startTimestamp: firestore.Timestamp.fromDate(
              new Date(getReportStartDateTime(reportData)),
            ),
          });

        return [reportPromise, reportFirestoreMetadataPromise];
      });
      await Promise.all(uploadPromises);
    }
  } catch (error) {
    throw new Error(error);
  }
};
