/**
 * configManager module
 *
 * Load firestore user data into redux persist.
 */

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { store } from '../App.js';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
} from './locationIds.js';
import { setGroup, addPerson, clearPersonnel } from '../actions';

export const updateUserData = async () => {
  try {
    const { currentUser } = auth();
    // User is signed in.
    if (currentUser) {
      const { uid } = currentUser;
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(uid)
        .get();
      const { groups, personnel } = documentSnapshot.data();

      const groupIds = [
        GROUP_ONE,
        GROUP_TWO,
        GROUP_THREE,
        GROUP_FOUR,
        GROUP_FIVE,
        GROUP_SIX,
      ];
      // set default group settings
      groupIds.forEach(id => {
        const { name, visibility } = groups[id];
        store.dispatch(setGroup(id, name, visibility));
      });
      // refresh personnel data
      store.dispatch(clearPersonnel());
      personnel.forEach(person => {
        store.dispatch(addPerson(person, false)); // disable logging
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
