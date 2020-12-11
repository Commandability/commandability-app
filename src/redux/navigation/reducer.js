/**
 * Navigation Reducer
 *
 * Change the current navigation stack.
 */

import {
  SIGN_IN,
  SIGN_OUT,
  TO_HOME_STACK,
  TO_INCIDENT_STACK,
  TO_END_STACK,
} from '../types';
import { AUTH_STACK } from '../../modules/stack-ids';

const initialState = {
  currentStack: AUTH_STACK,
};

const setStack = (state, action) => {
  const { payload } = action;
  const { stack } = payload;
  return {
    ...state,
    currentStack: stack,
  };
};

export const selectStack = state => {
  return state.currentStack;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_OUT:
    case TO_HOME_STACK:
    case TO_INCIDENT_STACK:
    case TO_END_STACK:
      return setStack(state, action);
    default:
      return state;
  }
};
