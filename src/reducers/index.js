import { combineReducers } from "redux";
import GroupReducer from "./GroupReducer";
import RosterReducer from "./RosterReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
  group: GroupReducer,
  roster: RosterReducer,
  auth: AuthReducer
});