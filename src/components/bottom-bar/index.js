/**
 * BottomBar Component
 *
 * This component handles the info bar under the staging area,
 * includes the timer, brightness and end incident
 */

import React from 'react';
import {Alert, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import SmallButton from '../small-button';
import {selectPersonnel, selectTheme} from '../../redux/selectors';
import {toggleTheme, toEndStack, endIncident} from '../../redux/actions';
import Timer from '../timer';
import {staticLocations} from '../../utils/locations';
import {DARK} from '../../utils/themes';
import createStyleSheet from './styles';

const {ROSTER, NEW_PERSONNEL, STAGING} = staticLocations;

const BottomBar = ({initialEpoch}) => {
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
      <View style={styles.timer}>
        <Timer initialEpoch={initialEpoch} />
      </View>
      <View style={styles.options}>
        <SmallButton
          onPress={onThemePressed}
          text={theme === DARK ? 'LIGHT THEME' : 'DARK THEME'}
        />
        <SmallButton onPress={onEndPressed} text="END" type="navigator" />
      </View>
    </View>
  );
};

// props validation
BottomBar.propTypes = {
  initialEpoch: PropTypes.number,
};

export default BottomBar;
