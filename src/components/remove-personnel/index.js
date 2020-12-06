/**
 * RemovePersonnel Component
 *
 * This component handles removing personnel from the staging list
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {
  getTheme,
  getSelectedLocationId,
  getSelectedPersonnel,
} from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';
import { STAGING, ROSTER } from '../../modules/location-ids';
import {
  clearSelectedPersonnel,
  movePerson,
  removePerson,
} from '../../redux/actions';

const RemovePersonnel = ({ temporary }) => {
  const dispatch = useDispatch();
  const selectedLocationId = useSelector(state => getSelectedLocationId(state));
  const selectedPersonnel = useSelector(state => getSelectedPersonnel(state));
  const theme = useSelector(state => getTheme(state));

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
            selectedPersonnel.forEach(person => {
              // set each selected id's new locationId to ROSTER
              temporary
                ? dispatch(removePerson(person))
                : dispatch(
                    movePerson(
                      person,
                      // To report prev location
                      { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
                      { locationId: ROSTER, name: 'Roster' }
                    )
                  );
              dispatch(clearSelectedPersonnel());
            });
          },
        },
      ]
    );
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  const renderOverlay = selectedLocationId == STAGING;

  return (
    <View style={styles.container}>
      {renderOverlay && (
        <TouchableOpacity style={styles.overlay} onPress={onRemovePressed} />
      )}
      <View style={styles.remove}>
        <Text style={styles.header}>REMOVE PERSONNEL</Text>
        <Icon name="account-multiple-remove" style={styles.icon} />
      </View>
    </View>
  );
};

// props validation
RemovePersonnel.propTypes = {
  temporary: PropTypes.bool,
};

export default RemovePersonnel;
