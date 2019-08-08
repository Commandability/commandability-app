import { combineReducers } from "redux";
import PersonnelReducer from "./PersonnelReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
  auth: AuthReducer,
  personnel: PersonnelReducer
});