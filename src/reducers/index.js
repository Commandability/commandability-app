import { combineReducers } from "redux";
import PersonnelReducer from  "./PersonnelReducer";
import GroupReducer from "./GroupReducer";

export default combineReducers({
  auth: AuthReducer,
  personnel: PersonnelReducer
});