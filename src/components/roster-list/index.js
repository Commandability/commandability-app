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
import { ROSTER } from '../../modules/location-ids';
import styles from './styles';

const RosterList = ({ query }) => {
  const selectPersonnelByLocationId = useMemo(() => createSelectPersonnelByLocationId(ROSTER), []);
  const personnel = useSelector(state =>
    selectPersonnelByLocationId(state)
  );

  const renderItem = ({ item: { id } }) => <RosterItem id={id} />;

  const keyExtractor = item => item.id;

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

export default RosterList;
