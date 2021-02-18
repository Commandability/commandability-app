/**
 * AddPersonnelPrompt Component
 *
 * Provides functionality for moving personnel to the current incident screen.
 */

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import { BackButton, SmallButton } from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import { NewPersonnel, Roster } from '../../components';
import { staticLocations } from '../../modules/locations';
import { movePerson } from '../../redux/actions';
import {
  createSelectPersonnelByLocationId,
  selectTheme,
} from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const { NEW_PERSONNEL, STAGING } = staticLocations;

const AddPersonnelPrompt = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const selectPersonnelByLocationId = useMemo(
    () => createSelectPersonnelByLocationId(NEW_PERSONNEL.locationId),
    []
  );
  const personnel = useSelector(state => selectPersonnelByLocationId(state));

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
    <ErrorBoundary FallbackComponent={ErrorFallbackScreen}>
      <View style={styles.container}>
        <BackButton />
        <View style={styles.leftCol}>
          <View style={styles.colContainer}>
            <NewPersonnel />
            <SmallButton
              text="ADD TO INCIDENT"
              onPress={onAddToIncidentPressed}
            />
          </View>
        </View>
        <View style={styles.rightCol}>
          <View style={styles.colContainer}>
            <Roster />
            <SmallButton
              text="ADD PERSON"
              onPress={onAddPersonPressed}
              type="navigator"
            />
          </View>
        </View>
      </View>
    </ErrorBoundary>
  );
};

// props validation
AddPersonnelPrompt.propTypes = {
  navigation: PropTypes.object,
};

export default AddPersonnelPrompt;