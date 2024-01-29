/**
 * All redux actions
 */

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {v4 as uuidv4} from 'uuid';

import {
  RESET_APP,
  RESET_INCIDENT,
  UPDATE_CONFIGURATION,
  START_INCIDENT,
  END_INCIDENT,
  RESUME_INCIDENT,
} from './types';
import {INCIDENT_STACK, END_STACK} from '../utils/navigation-stacks';
import {staticLocations} from '../utils/locations';
import {dateTimeFormat} from '../utils/report-manager';

const {ROSTER} = staticLocations;

export * from './groups/actions';
export * from './navigation/actions';
export * from './personnel/actions';
export * from './selected/actions';
export * from './theme/actions';

export const resetApp = () => ({
  type: RESET_APP,
});

export const resetIncident = () => ({
  type: RESET_INCIDENT,
});

export const updateConfiguration = () => {
  return async (dispatch) => {
    try {
      const {currentUser} = auth();
      const {uid} = currentUser;
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(uid)
        .get();
      const {groups: loadedGroups, personnel: loadedPersonnel} =
        documentSnapshot.data() ?? {};

      dispatch(updateConfigurationSuccess(loadedGroups, loadedPersonnel));
    } catch (error) {
      // Error.code provided by firebase
      throw new Error(error.code);
    }
  };
};

const updateConfigurationSuccess = (
  loadedGroups = {},
  loadedPersonnel = [],
) => {
  const personnel = loadedPersonnel.map((person) => ({
    personId: uuidv4(),
    locationId: ROSTER.locationId,
    locationUpdateTime: 0,
    isTemporary: false,
    ...person,
  }));

  return {
    type: UPDATE_CONFIGURATION,
    payload: {groups: loadedGroups, personnel},
  };
};

export const startIncident = (initialEpoch) => {
  const entryId = START_INCIDENT; // For storage in the report reducer
  const dateTime = new Date().toLocaleString(dateTimeFormat);
  return {
    type: START_INCIDENT,
    payload: {entryId, dateTime, stack: INCIDENT_STACK, initialEpoch},
  };
};

export const endIncident = () => {
  const entryId = END_INCIDENT; // For storage in the report reducer
  const dateTime = new Date().toLocaleString(dateTimeFormat);
  return {
    type: END_INCIDENT,
    payload: {entryId, dateTime, stack: END_STACK},
  };
};

export const resumeIncident = () => ({
  type: RESUME_INCIDENT,
  payload: {stack: INCIDENT_STACK},
});
