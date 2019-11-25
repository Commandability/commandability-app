import { RESET_APP } from "./types";

export * from "./PersonnelActions";
export * from "./SelectedActions";

export const resetApp = () => ({
  type: RESET_APP
});