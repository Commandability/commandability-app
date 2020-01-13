/**
 * Time Reducer
 *
 * Reducers to track certain timers on the App.
 */

import { START_INCIDENT } from '../actions/types';

const initialState = {
  time: {},
};

const updateInitialTime = (state) => {
  return {
    ...state,
    initialTime: Date.now(),
  };
};

export const getInitialTime = state => {
  return state.initialTime;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_INCIDENT:
      return updateInitialTime(state, action);
    default:
      return state;
  }
};
