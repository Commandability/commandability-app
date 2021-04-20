/**
 * Group selectors
 */

import {createSelector} from 'reselect';

import * as groups from './reducer';
import {pageLocations} from '../../utils/locations.js';

export const selectGroupByLocationId = (state, locationId) =>
  groups.selectGroupByLocationId(state.groups, locationId);

export const selectGroups = (state) => groups.selectGroups(state.groups);

export const selectAlertedGroups = createSelector(
  selectGroups,
  (selectedGroups) => {
    const alertedGroups = [];
    Object.keys(pageLocations).forEach((page) => {
      pageLocations[page].locationIds.forEach((locationId) => {
        const {alerted} = selectedGroups[locationId];

        if (alerted.length) {
          alertedGroups.push(locationId);
        }
      });
    });
    return alertedGroups;
  },
);
