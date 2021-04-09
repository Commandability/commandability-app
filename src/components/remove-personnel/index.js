/**
 * RemovePersonnel Component
 *
 * This component handles removing personnel from the staging list
 *
 */

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  selectTheme,
  selectSelectedLocationId,
  selectSelectedPersonnel,
} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';
import {staticLocations} from '../../utils/locations';
import {
  clearSelectedPersonnel,
  movePerson,
  removePerson,
} from '../../redux/actions';

const {STAGING, ROSTER} = staticLocations;

const RemovePersonnel = () => {
  const dispatch = useDispatch();
  const selectedLocationId = useSelector((state) =>
    selectSelectedLocationId(state),
  );
  const selectedPersonnel = useSelector((state) =>
    selectSelectedPersonnel(state),
  );
  const theme = useSelector((state) => selectTheme(state));

  const onRemovePressed = () => {
    Alert.alert(
      'Remove selected personnel from incident?',
      'All selected personnel will be returned to the roster list and marked as off-scene in the report. ',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            selectedPersonnel.forEach((person) => {
              const {isTemporary} = person;
              isTemporary
                ? // remove each temporary selected personId
                  dispatch(removePerson(person))
                : // set each selected personId's new locationId to ROSTER
                  dispatch(
                    movePerson(
                      person,
                      // To report prev location
                      STAGING, // Set prev group to staging if no prev group in redux
                      ROSTER,
                    ),
                  );
              dispatch(clearSelectedPersonnel());
            });
          },
        },
      ],
    );
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  const renderOverlay = selectedLocationId === STAGING.locationId;

  return (
    <View style={styles.container}>
      {renderOverlay ? (
        <TouchableOpacity style={styles.overlay} onPress={onRemovePressed} />
      ) : null}
      <View style={styles.remove}>
        <Text style={styles.header}>REMOVE PERSONNEL</Text>
        <Icon name="account-multiple-remove" style={styles.icon} />
      </View>
    </View>
  );
};

export default RemovePersonnel;
