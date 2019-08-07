import { combineReducers } from "redux";
import PersonnelReducer from "./PersonnelReducer";

export default combineReducers({
  auth: AuthReducer,
  personnel: PersonnelReducer
});