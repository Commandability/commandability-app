/**
 * PersonnelPrompt Component
 *
 * Provides functionality for moving personnel to the current incident screen.
 */

import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { NewPersonnel, Roster } from '../../components';
import { incidentLocations } from '../../modules/locations';
import { movePerson } from '../../redux/actions';
import {
  createSelectPersonnelByLocationId,
  selectTheme,
} from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const { NEW_PERSONNEL, STAGING } = incidentLocations;

const PersonnelPrompt = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const selectPersonnelByLocationId = useMemo(
    () => createSelectPersonnelByLocationId(NEW_PERSONNEL.locationId),
    []
  );
  const personnel = useSelector(state => selectPersonnelByLocationId(state));

  const onCancelPressed = () => {
    const { goBack } = navigation;
    goBack();
  };

  const onAddToIncidentPressed = () => {
    personnel.forEach(person => {
      dispatch(
        movePerson(
          person,
          // To report prev location
          NEW_PERSONNEL,
          STAGING
        )
      );
    });
    const { goBack } = navigation;
    goBack();
  };

  const onAddPersonPressed = () => {
    const { navigate } = navigation;
    navigate('AddPersonPrompt');
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <View style={styles.backBar}>
          <TouchableOpacity onPress={onCancelPressed}>
            <Icon name="chevron-left" style={styles.backButton} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.promptContainer}>
        <View style={styles.leftCol}>
          <View style={styles.newPersonnel}>
            <NewPersonnel />
            <TouchableOpacity
              style={styles.option}
              onPress={onAddToIncidentPressed}
            >
              <Text style={styles.optionContent}>ADD TO INCIDENT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightCol}>
          <View style={styles.roster}>
            <Roster />
            <TouchableOpacity
              style={styles.option}
              onPress={onAddPersonPressed}
            >
              <Text style={styles.optionContent}>ADD PERSON</Text>
              <Icon name="arrow-right" style={styles.optionContent} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// props validation
PersonnelPrompt.propTypes = {
  navigation: PropTypes.object,
};

export default PersonnelPrompt;
