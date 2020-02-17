/**
 * User Reducer
 *
 * Reducers to manage the given user.
 */

import { NEW_USER } from '../actions/types';

const updateUser = (state, action) => {
  const { email } = action;
  return {
    ...state,
    email: email,
  };
};

export const getUser = state => {
    return state.email;
};

export default (state = 0, action) => {
  switch (action.type) {
    case NEW_USER:
      return updateUser(state, action);
    default:
      return state;
  }
};
