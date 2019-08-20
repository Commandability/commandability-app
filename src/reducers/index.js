import { combineReducers } from "redux";
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


import auth from "./AuthReducer";
import personnel, * as fromPersonnel from "./PersonnelReducer";
import selected, * as fromSelected from "./SelectedReducer";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
}

const personnelPersistConfig = {
  key: "personnel",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
  auth,
  personnel: persistReducer(personnelPersistConfig, personnel),
  selected
});

export default persistReducer(rootPersistConfig, rootReducer);

export const getSelectedIds = state =>
  fromSelected.getSelectedIds(state.selected);
export const getSelectedLocation = state =>
  fromSelected.getSelectedLocation(state.selected);
export const getPersonnelByLocation = (state, location) =>
  fromPersonnel.getPersonnelByLocation(state.personnel, location);
