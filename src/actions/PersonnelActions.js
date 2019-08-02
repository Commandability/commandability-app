import { Actions } from "react-native-router-flux";
import uuidv4 from "uuid/v4";
import { ADD_PERSONNEL } from "./types";

export const addPersonnel = ({ badge, firstName, lastName, rank, shift }) => {
  const id = uuidv4();
  return {
    type: ADD_PERSONNEL,
    payload: { id, badge, firstName, lastName, rank, shift }
  };
};
