// Report selectors

import * as report from './reducer';

export const activeReport = state => report.activeReport(state.report);
export const completedReport = state => report.completedReport(state.report);
export const getCurrentReportData = state =>
  report.getCurrentReportData(state.report);
