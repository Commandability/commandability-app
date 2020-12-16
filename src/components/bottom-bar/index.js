/**
 * BottomBar Component
 *
 * This component handles the info bar under the staging area,
 * includes the timer, brightness and end incident
 */

import React from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { selectPersonnel, selectTheme } from '../../redux/selectors';
import { toggleTheme, toEndStack } from '../../redux/actions';
import Timer from '../timer';
import { incidentLocations } from '../../modules/locations';
import { DARK } from '../../modules/theme-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const { ROSTER, NEW_PERSONNEL, STAGING } = incidentLocations;

const BottomBar = ({ initialEpoch }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const personnel = useSelector(state => selectPersonnel(state));

  const onEndPressed = () => {
    const personnelAreInGroups = personnel.every(
      person =>
        person.locationId === ROSTER.locationId ||
        person.locationId === NEW_PERSONNEL.locationId ||
        person.locationId === STAGING.locationId
    );

    if (!personnelAreInGroups) {
      Alert.alert(
        'Personnel are still active',
        'Please move all personnel to staging before ending the incident',
        [
          {
            text: 'OK',
          },
        ]
      );
    } else {
      Alert.alert('Are you sure you want to end the incident?', '', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(toEndStack());
          },
        },
      ]);
    }
  };

  const onThemePressed = () => dispatch(toggleTheme());

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Timer initialEpoch={initialEpoch} />
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={styles.option} onPress={onThemePressed}>
          <Text style={styles.optionContent}>
            {theme === DARK ? 'LIGHT THEME' : 'DARK THEME'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={onEndPressed}>
          <Text style={styles.optionContent}> END </Text>
          <Icon name="arrow-right" style={styles.optionContent} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// props validation
BottomBar.propTypes = {
  initialEpoch: PropTypes.number,
};

export default BottomBar;
