import { RESET_APP } from "./types";

export * from "./AuthActions";
export * from "./PersonnelActions";
export * from "./SelectedActions";

export const resetApp = () => ({
  type: RESET_APP
});