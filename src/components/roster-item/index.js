/**
 * RosterItem Component
 *
 * Manages displaying a person in a the roster and sets a person's locationId in redux to NEW_PERSONNEL when selected.
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectTheme } from '../../redux/selectors';
import { movePerson } from '../../redux/actions';
import { ROSTER, NEW_PERSONNEL } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const RosterItem = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const onPress = () => {
    dispatch(
      movePerson(
        item,
        { locationId: ROSTER, name: 'Roster' },
        { locationId: NEW_PERSONNEL, name: 'New Personnel' }
      )
    );
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const { firstName, lastName, badge, shift } = item;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainLine}>
          <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>{`${badge ? badge + ' ' : ''}`}</Text>
          <Text style={styles.label}>{`${shift ? shift : ''}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// props validation
RosterItem.propTypes = {
  item: PropTypes.object, // the current person
};

export default RosterItem;
