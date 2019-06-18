/**
 * Sample reducer to deliver group data to redux store
 * This will later be connected to firebase
 */

import personnel from "./Personnel.json";

let defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type){
    case 'ADD_PERSON':
      return state + 1;
    default:
      return personnel.berea;
  }
};
