/**
 * Report selectors
 */

import * as report from './reducer';

export const selectReportData = (state) =>
  report.selectReportData(state.report);
