/**
 * AddPersonPrompt Component
 *
 * Provides functionality for adding temporary personnel to the incident.
 */

import React, { useState } from 'react';
import { Alert, View, TextInput, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';

import { BackButton, LargeButton } from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import { addPerson } from '../../redux/actions';
import { selectTheme } from '../../redux/selectors';
import { staticLocations } from '../../utils/locations';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';

const { NEW_PERSONNEL } = staticLocations;

const AddPersonPrompt = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [badge, setBadge] = useState('');
  const [organization, setOrganization] = useState('');

  const onAddPersonPressed = () => {
    if (!firstName || !lastName) {
      Alert.alert('Please enter both a first and last name', '', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    dispatch(
      addPerson(
        { firstName, lastName, badge, organization },
        NEW_PERSONNEL.locationId
      )
    );

    const { navigate } = navigation;
    navigate('AddPersonnelPrompt');
  };

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);

  const onReset = () => {
    setFirstName('');
    setLastName('');
    setBadge('');
    setOrganization('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[firstName, lastName, badge, organization]}
    >
      <View style={globalStyles.container}>
        <BackButton />
        <View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <Text style={globalStyles.label}>First Name*</Text>
            <TextInput
              style={globalStyles.input}
              maxLength={36}
              value={firstName}
              onChangeText={firstName => setFirstName(firstName)}
              selectionColor={colors.primary}
            />
            <Text style={globalStyles.label}>Last Name*</Text>
            <TextInput
              style={globalStyles.input}
              maxLength={36}
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
              selectionColor={colors.primary}
            />
            <Text style={globalStyles.label}>Badge Number</Text>
            <TextInput
              style={globalStyles.input}
              keyboardType={'numeric'}
              maxLength={10}
              value={badge}
              onChangeText={badge => setBadge(badge)}
              selectionColor={colors.primary}
            />
            <Text style={globalStyles.label}>Organization</Text>
            <TextInput
              style={globalStyles.input}
              maxLength={36}
              value={organization}
              onChangeText={organization => setOrganization(organization)}
              selectionColor={colors.primary}
            />
            <LargeButton
              text="Add person"
              onPress={onAddPersonPressed}
              icon="account-plus"
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </ErrorBoundary>
  );
};

// props validation
AddPersonPrompt.propTypes = {
  navigation: PropTypes.object,
};

export default AddPersonPrompt;
