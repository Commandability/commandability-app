/**
 * Navigation Reducer
 *
 * Change the current navigation stack.
 */

import {
  SIGN_IN,
  SIGN_OUT
} from '../actions';
import { AUTH_STACK, HOME_STACK } from './stacks';

const initialState = {
  currentStack: AUTH_STACK
};

const setStack = (state, action) => {
  const { payload } = action;
  const { stack } = payload;
  return {
    ...state,
    currentStack: stack
  };
};

export const getAuthStatus = state => {
  return state.currentStack !== AUTH_STACK;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return setStack(HOME_STACK);
    case SIGN_OUT:
      return setStack(AUTH_STACK);
    default:
      return state;
  }
};
