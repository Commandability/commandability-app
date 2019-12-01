import { RESET_APP } from "./types";

export * from "./PersonnelActions";
export * from "./SelectedActions";
export * from "./GroupActions";
export * from "./IncidentActions";

export const resetApp = () => ({
  type: RESET_APP
});