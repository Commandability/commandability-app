/**
 * RosterList Component
 *
 * Manages displaying personnel in the roster.
 */

import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { createSelectPersonnelByLocationId } from '../../redux/selectors';
import RosterItem from '../roster-item';
import { staticLocations } from '../../modules/locations';
import styles from './styles';

const { ROSTER } = staticLocations;

const RosterList = ({ query }) => {
  const selectPersonnelByLocationId = useMemo(
    () => createSelectPersonnelByLocationId(ROSTER.locationId),
    []
  );
  const personnel = useSelector(state => selectPersonnelByLocationId(state));

  const renderItem = ({ item: { personId } }) => (
    <RosterItem personId={personId} />
  );

  const keyExtractor = item => item.personId;

  return (
    <FlatList
      style={styles.container}
      keyboardShouldPersistTaps="always"
      data={
        query
          ? personnel.filter(person => {
              const { firstName, lastName, badge, shift } = person || undefined;
              return (
                firstName.toLowerCase().includes(query) ||
                lastName.toLowerCase().includes(query) ||
                (badge ? badge.includes(query) : false) ||
                (shift ? shift.includes(query) : false)
              );
            })
          : personnel
      }
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

// props validation
RosterList.propTypes = {
  query: PropTypes.string,
};

export default React.memo(RosterList);
