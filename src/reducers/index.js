/**
 * Reducers index
 *
 * This file generates persistReducers for redux-persist and exports all redux selectors.
 * It also contains the logic for the RESET_APP action.
 */

import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, purgeStoredState } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import personnel, * as fromPersonnel from './PersonnelReducer';
import groups, * as fromGroups from './GroupReducer';
import report, * as fromReport from './ReportReducer';
import timer, * as fromTimer from './TimerReducer';
import selected, * as fromSelected from './SelectedReducer';
import { RESET_APP } from '../actions/types';

// personnel reducer config, set persisted data to autoMergeLevel2 to track personnel changes
// https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
const personnelPersistConfig = {
  key: 'personnel',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const groupsPersistConfig = {
  key: 'groups',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const reportPersistConfig = {
  key: 'report',
  storage: AsyncStorage,
};

const timePersistConfig = {
  key: 'timer',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  personnel: persistReducer(personnelPersistConfig, personnel),
  groups: persistReducer(groupsPersistConfig, groups),
  timer: persistReducer(timePersistConfig, timer),
  report: persistReducer(reportPersistConfig, report),
  selected,
});

// root reducer config, persisted data defaults to autoMergeLevel1
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = (state, action) => {
  // should ONLY be called immediately before signing user out
  if (action.type === RESET_APP) {
    // undefined state results in all reducers returning default state because of default parameters
    state = undefined; // does not mutate state
    purgeStoredState(personnelPersistConfig);
    purgeStoredState(groupsPersistConfig);
    purgeStoredState(reportPersistConfig);
    purgeStoredState(rootPersistConfig);
    purgeStoredState(timePersistConfig);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

// General selectors
export const configurationLoaded = state =>
  Boolean(
    fromPersonnel.configurationLoaded(state.personnel) ||
      fromGroups.configurationLoaded(state.groups)
  );

// Personnel selectors
export const getPersonnelByLocationId = (state, locationId) =>
  fromPersonnel.getPersonnelByLocationId(state.personnel, locationId);
export const getPersonGroupUpdateTime = (state, person) =>
  fromPersonnel.getPersonGroupUpdateTime(state.personnel, person);

// Selected selectors
export const getSelectedLocationId = state =>
  fromSelected.getSelectedLocationId(state.selected);
export const getSelectedPersonnelGroups = state =>
  fromSelected
    .getSelectedIds(state.selected)
    .map(id => fromPersonnel.getPersonById(state.personnel, id))
    .map(person => ({
      person,
      group: fromGroups.getGroupByLocationId(state.groups, person.locationId),
    }));
export const personIsSelected = (state, person) =>
    fromSelected.personIsSelected(state.selected, person);

// Groups selectors
export const getGroupByLocationId = (state, locationId) =>
  fromGroups.getGroupByLocationId(state.groups, locationId);

// Time selectors
export const getInitialEpoch = state => fromTimer.getInitialEpoch(state.timer);

// Report selectors
export const activeReport = state => fromReport.activeReport(state.report);
export const completedReport = state =>
  fromReport.completedReport(state.report);
export const getCurrentReportData = state =>
  fromReport.getCurrentReportData(state.report);
