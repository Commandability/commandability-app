import { Actions } from "react-native-router-flux";
import uuidv4 from "uuid/v4";
import { ADD_GROUP } from "./types";

export const movePersonnel = ({ name, personnel }) => {
  const id = uuidv4();
  return {
    type: ADD_GROUP,
    payload: { id, name, personnel }
  };
};