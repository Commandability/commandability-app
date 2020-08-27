/**
 * Navigation Actions
 *
 * Actions to add change the current navigation stack.
 */

import auth from '@react-native-firebase/auth';

import {
  SIGN_IN,
  SIGN_OUT
} from '../actions';
import {
  AUTH_STACK,
  HOME_STACK
} from './stacks';
  
export const signIn = (email, password) => {
  return async dispatch => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      dispatch(signInSuccess());
    } catch(error){
      throw new Error(error);
    }
  };
};

const signInSuccess = () => ({
  type: SIGN_IN,
  payload: { stack: HOME_STACK }
});

export const signOut = () => {
  return async dispatch => {
    try {
      await auth().signOut();
      dispatch(signOutSuccess());
    } catch(error){
      throw new Error(error);
    }
  };
};

const signOutSuccess = () => ({
  type: SIGN_OUT,
  payload: { stack: AUTH_STACK }
});
