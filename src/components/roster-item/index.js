/**
 * RosterItem Component
 *
 * Manages displaying a person in a the roster and sets a person's locationId in redux to NEW_PERSONNEL when selected.
 */

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {selectTheme, selectPersonById} from '../../redux/selectors';
import {movePerson} from '../../redux/actions';
import {staticLocations} from '../../utils/locations';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const {ROSTER, NEW_PERSONNEL} = staticLocations;

const RosterItem = ({personId}) => {
  const dispatch = useDispatch();
  const person = useSelector((state) => selectPersonById(state, personId));
  const theme = useSelector((state) => selectTheme(state));

  const onPress = () => {
    dispatch(movePerson(person, ROSTER, NEW_PERSONNEL));
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const {firstName, lastName, badge, shift} = person;

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
  personId: PropTypes.string, // the current person
};

export default React.memo(RosterItem);
