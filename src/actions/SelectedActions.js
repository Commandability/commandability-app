import { TOGGLE_SELECTED, CLEAR_SELECTED_PERSONNEL } from "./types";

export const toggleSelectedById = (id, location) => ({
  type: TOGGLE_SELECTED,
  payload: { id, location }
});

export const clearSelectedPersonnel = () => ({
  type: CLEAR_SELECTED_PERSONNEL
});
