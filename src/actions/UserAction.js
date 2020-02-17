/**
 * User Actions
 *
 * Actions to manage users.
 */

import { NEW_USER } from './types';

export const updateUser = (email) => ({
  type: NEW_USER,
  payload: { email },
});
