// Selected selectors

import * as selected from './reducer';

export const selectSelectedLocationId = state =>
  selected.selectSelectedLocationId(state.selected);

export const selectSelectedPersonnelIds = state =>
  selected.selectSelectedPersonnelIds(state.selected);