/**
 * BottomBar Component
 *
 * Handles the bar under the staging area, including the incident time, and the brightness and end incident buttons
 */

import React from 'react';
import {Alert, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import SmallButton from '../small-button';
import {selectPersonnel, selectTheme} from '../../redux/selectors';
import {toggleTheme, toEndStack, endIncident} from '../../redux/actions';
import Timer from '../timer';
import {staticLocations} from '../../utils/locations';
import {DARK} from '../../utils/themes';
import createStyleSheet from './styles';

const {ROSTER, NEW_PERSONNEL, STAGING} = staticLocations;

const BottomBar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));
  const personnel = useSelector((state) => selectPersonnel(state));

  const onEndPressed = () => {
    const personnelAreInGroups = personnel.every(
      (person) =>
        person.locationId === ROSTER.locationId ||
        person.locationId === NEW_PERSONNEL.locationId ||
        person.locationId === STAGING.locationId,
    );

    if (!personnelAreInGroups) {
      Alert.alert(
        'Personnel are still active',
        'Please move all personnel to staging before ending the incident.',
        [
          {
            text: 'OK',
          },
        ],
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
            dispatch(endIncident()); // log incident end
            dispatch(toEndStack());
          },
        },
      ]);
    }
  };

  const onThemePressed = () => dispatch(toggleTheme());

  const styles = createStyleSheet();

  return (
    <View style={styles.container}>
      <Timer />
      <View style={styles.options}>
        <SmallButton
          onPress={onThemePressed}
          text={theme === DARK ? 'LIGHT THEME' : 'DARK THEME'}
          style={styles.bottomButton}
        />
        <SmallButton
          onPress={onEndPressed}
          text="END"
          type="navigator"
          style={styles.bottomButton}
        />
      </View>
    </View>
  );
};

export default BottomBar;
