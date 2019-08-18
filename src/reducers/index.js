import { combineReducers } from "redux";
import auth from "./AuthReducer";
import personnel, * as fromPersonnel from "./PersonnelReducer";
import selected, * as fromSelected from "./SelectedReducer";

export default combineReducers({
  auth,
  personnel,
  selected
});

export const getSelectedIds = state =>
  fromSelected.getSelectedIds(state.selected);
export const getSelectedLocation = state =>
  fromSelected.getSelectedLocation(state.selected);
export const getPersonnelByLocation = (state, location) =>
  fromPersonnel.getPersonnelByLocation(state.personnel, location);
