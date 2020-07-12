// Groups selectors

import * as groups from './reducer';

export const getGroupByLocationId = (state, locationId) =>
  groups.getGroupByLocationId(state.groups, locationId);
