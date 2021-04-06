// Groups selectors

import { createSelector } from 'reselect';

import * as groups from './reducer';
import { pageLocationIds } from '../../utils/locations.js';

export const selectGroupByLocationId = (state, locationId) =>
  groups.selectGroupByLocationId(state.groups, locationId);

export const selectGroups = state => groups.selectGroups(state.groups);

export const selectAlertedGroups = createSelector(
  selectGroups,
  groups => {
    const alertedGroups = [];
    Object.keys(pageLocationIds).forEach(page => {
      pageLocationIds[page].locationIds.forEach(locationId => {
        const { alerted } = groups[locationId];

        if (alerted.length) {
          alertedGroups.push(locationId);
        }
      });
    });
    return alertedGroups;
  }
);
