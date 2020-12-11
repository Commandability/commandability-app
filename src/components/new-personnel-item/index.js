/**
 * NewPersonnelItem Component
 *
 * Manages displaying a person in a the new personnel list and sets a person's locationId in redux to STAGING when selected.
 */

import React from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { selectTheme } from '../../redux/selectors';
import { removePerson, movePerson } from '../../redux/actions';
import { ROSTER, NEW_PERSONNEL } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const NewPersonnelItem = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const onPress = () => {
    Alert.alert('Remove person?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          isTemporary
            // remove each temporary selected id
            ? dispatch(removePerson(item))
            // set each selected id's new locationId to ROSTER
            : dispatch(
                movePerson(
                  item,
                  { locationId: NEW_PERSONNEL, name: 'New Personnel' }, // Set prev group to new personnel if no prev group in redux
                  { locationId: ROSTER, name: 'Roster' }
                )
              );
        },
      },
    ]);
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const { isTemporary, firstName, lastName, badge, shift } = item;

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
NewPersonnelItem.propTypes = {
  item: PropTypes.object, // the current person
};

export default NewPersonnelItem;
