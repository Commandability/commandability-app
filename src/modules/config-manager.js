/**
 * Config manager module
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
  GROUP_SEVEN,
  GROUP_EIGHT,
  GROUP_NINE,
  GROUP_TEN,
  GROUP_ELEVEN,
  GROUP_TWELVE,
  GROUP_THIRTEEN,
  GROUP_FOURTEEN,
  GROUP_FIFTEEN,
  GROUP_SIXTEEN,
  GROUP_SEVENTEEN,
  GROUP_EIGHTEEN,
  ROSTER,
} from './location-ids.js';
import { setGroup, addPerson, clearPersonnel } from '../redux/actions';

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
        GROUP_SEVEN,
        GROUP_EIGHT,
        GROUP_NINE,
        GROUP_TEN,
        GROUP_ELEVEN,
        GROUP_TWELVE,
        GROUP_THIRTEEN,
        GROUP_FOURTEEN,
        GROUP_FIFTEEN,
        GROUP_SIXTEEN,
        GROUP_SEVENTEEN,
        GROUP_EIGHTEEN,
      ];
      // set default group settings
      groupIds.forEach(id => {
        const { name, visibility } = groups[id];
        store.dispatch(setGroup(id, name, visibility));
        console.log(groups[id]);
      });
      // refresh personnel data
      store.dispatch(clearPersonnel());
      personnel.forEach(person => {
        store.dispatch(addPerson(person, false, ROSTER)); // disable logging
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
