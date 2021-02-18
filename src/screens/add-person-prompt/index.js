/**
 * AddPersonPrompt Component
 *
 * Provides functionality for adding temporary personnel to the incident.
 */

import React, { useState } from 'react';
import { Alert, View, TouchableOpacity, TextInput, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';

import { BackButton } from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import { addPerson } from '../../redux/actions';
import { selectTheme } from '../../redux/selectors';
import { staticLocations } from '../../modules/locations';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

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
  const styles = createStyleSheet(colors);

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
      <View style={styles.container}>
        <BackButton />
        <View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>First Name*</Text>
            <TextInput
              style={styles.input}
              maxLength={36}
              value={firstName}
              onChangeText={firstName => setFirstName(firstName)}
            />
            <Text style={styles.label}>Last Name*</Text>
            <TextInput
              style={styles.input}
              maxLength={36}
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
            />
            <Text style={styles.label}>Badge Number</Text>
            <TextInput
              style={styles.input}
              keyboardType={'numeric'}
              maxLength={10}
              value={badge}
              onChangeText={badge => setBadge(badge)}
            />
            <Text style={styles.label}>Organization</Text>
            <TextInput
              style={styles.input}
              maxLength={36}
              value={organization}
              onChangeText={organization => setOrganization(organization)}
            />
            <TouchableOpacity
              style={styles.opacity}
              onPress={onAddPersonPressed}
            >
              <Icon name="account-plus" style={styles.icon} />
              <Text style={styles.opacityText}> Add Person </Text>
            </TouchableOpacity>
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
