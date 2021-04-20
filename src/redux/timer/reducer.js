/**
 * Time Reducer
 *
 * Track the start time of the incident
 */

import {START_INCIDENT, RESET_INCIDENT} from '../types';

const initialState = {initialEpoch: 0};

const setInitialEpoch = (state, action) => {
  const {payload} = action;
  const {initialEpoch} = payload;
  return {
    ...state,
    initialEpoch,
  };
};

export const selectInitialEpoch = (state) => {
  return state.initialEpoch;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_INCIDENT:
      return setInitialEpoch(state, action);
    case RESET_INCIDENT:
      return initialState;
    default:
      return state;
  }
};
