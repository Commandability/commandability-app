/**
 * Navigation Actions
 *
 * Actions to change the current navigation stack.
 */

import auth from '@react-native-firebase/auth';

import {
  SIGN_IN,
  SIGN_OUT,
  TO_HOME_STACK,
  TO_INCIDENT_STACK,
  TO_END_STACK,
} from '../types';
import {
  AUTH_STACK,
  HOME_STACK,
  INCIDENT_STACK,
  END_STACK,
} from '../../utils/navigation-stacks';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      dispatch(signInSuccess());
    } catch (error) {
      // error.code provided by firebase
      throw new Error(error.code);
    }
  };
};

const signInSuccess = () => ({
  type: SIGN_IN,
  payload: {stack: HOME_STACK},
});

export const signOut = () => {
  return async (dispatch) => {
    try {
      await auth().signOut();
      dispatch(signOutSuccess());
    } catch (error) {
      throw new Error(error);
    }
  };
};

const signOutSuccess = () => ({
  type: SIGN_OUT,
  payload: {stack: AUTH_STACK},
});

export const toHomeStack = () => ({
  type: TO_HOME_STACK,
  payload: {stack: HOME_STACK},
});

export const toIncidentStack = () => ({
  type: TO_INCIDENT_STACK,
  payload: {stack: INCIDENT_STACK},
});

export const toEndStack = () => ({
  type: TO_END_STACK,
  payload: {stack: END_STACK},
});
