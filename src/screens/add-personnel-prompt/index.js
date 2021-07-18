/**
 * AddPersonnelPrompt Component
 *
 * Move roster and temporary personnel to the the new personnel list to be added to the incident
 */

import React, {useMemo} from 'react';
import {StatusBar, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ErrorBoundary} from 'react-error-boundary';
import PropTypes from 'prop-types';

import {BackButton, SmallButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {NewPersonnel, Roster} from '../../components';
import {staticLocations} from '../../utils/locations';
import {movePerson} from '../../redux/actions';
import {
  createSelectPersonnelByLocationId,
  selectTheme,
} from '../../redux/selectors';
import {DARK} from '../../utils/themes';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const {NEW_PERSONNEL, STAGING} = staticLocations;

const AddPersonnelPrompt = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));
  const selectPersonnelByLocationId = useMemo(
    () => createSelectPersonnelByLocationId(NEW_PERSONNEL.locationId),
    [],
  );
  const personnel = useSelector((state) => selectPersonnelByLocationId(state));

  const onAddToIncidentPressed = () => {
    personnel.forEach((person) => {
      dispatch(
        movePerson(
          person,
          // To report prev location
          NEW_PERSONNEL,
          STAGING,
        ),
      );
    });
    const {goBack} = navigation;
    goBack();
  };

  const onAddPersonPressed = () => {
    const {navigate} = navigation;
    navigate('AddPersonPrompt');
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackScreen}>
      <StatusBar
        barStyle={theme === DARK ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={styles.container}>
        <BackButton />
        <View style={styles.leftCol}>
          <View style={styles.colContainer}>
            <NewPersonnel />
            <SmallButton
              text="ADD TO INCIDENT"
              onPress={onAddToIncidentPressed}
              style={styles.colButton}
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
              style={styles.colButton}
            />
          </View>
        </View>
      </View>
    </ErrorBoundary>
  );
};

AddPersonnelPrompt.propTypes = {
  navigation: PropTypes.object,
};

export default AddPersonnelPrompt;
