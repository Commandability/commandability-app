// Groups selectors

import * as groups from './reducer';

export const selectGroupByLocationId = (state, locationId) =>
  groups.selectGroupByLocationId(state.groups, locationId);

export const selectGroups = state => groups.selectGroups(state.groups);
