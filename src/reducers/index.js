/**
 * Reducers index
 *
 * Generate persistReducers for redux-persist and export redux selectors.
 * https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
 */

import { combineReducers } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import auth from "./AuthReducer";
import personnel, * as fromPersonnel from "./PersonnelReducer";
import selected, * as fromSelected from "./SelectedReducer";
import { RESET_APP } from "../actions/types";

// root reducer config, persisted data defaults to autoMergeLevel1
const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage
};

// personnel reducer config, set persisted data to autoMergeLevel2 to track personnel changes
const personnelPersistConfig = {
  key: "personnel",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const appReducer = combineReducers({
  auth,
  personnel: persistReducer(personnelPersistConfig, personnel),
  selected
});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

export const getSelectedIds = state =>
  fromSelected.getSelectedIds(state.selected);
export const getSelectedLocation = state =>
  fromSelected.getSelectedLocation(state.selected);
export const getPersonnelByLocation = (state, location) =>
  fromPersonnel.getPersonnelByLocation(state.personnel, location);
