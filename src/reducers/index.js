import { combineReducers } from "redux";
import GroupReducer from "./GroupReducer";

export default combineReducers({
  group: GroupReducer,
});