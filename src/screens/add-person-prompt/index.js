/**
 * AddPersonPrompt Component
 *
 * Add temporary personnel to the incident
 */

import React, {useState} from 'react';
import {Alert, StatusBar, View, TextInput, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {ErrorBoundary} from 'react-error-boundary';

import {BackButton, LargeButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {addPerson} from '../../redux/actions';
import {selectTheme} from '../../redux/selectors';
import {staticLocations} from '../../utils/locations';
import {DARK} from '../../utils/themes';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';

const {NEW_PERSONNEL} = staticLocations;

const AddPersonPrompt = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));

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
        {firstName, lastName, badge, organization},
        NEW_PERSONNEL.locationId,
      ),
    );

    const {navigate} = navigation;
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
      resetKeys={[firstName, lastName, badge, organization]}>
      <StatusBar
        barStyle={theme === DARK ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <BackButton />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <View style={globalStyles.flex} />
        <View style={globalStyles.flex}>
          <View style={globalStyles.content}>
            <Text style={globalStyles.label}>First Name*</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={(_firstName) => setFirstName(_firstName)}
              value={firstName}
              maxLength={36}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
            />
            <Text style={globalStyles.label}>Last Name*</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={(_lastName) => setLastName(_lastName)}
              value={lastName}
              maxLength={36}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
            />
            <Text style={globalStyles.label}>Badge Number</Text>
            <TextInput
              style={globalStyles.input}
              keyboardType={'numeric'}
              onChangeText={(_badge) => setBadge(_badge)}
              value={badge}
              maxLength={15}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
            />
            <Text style={globalStyles.label}>Organization</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={(_organization) => setOrganization(_organization)}
              value={organization}
              maxLength={36}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
            />
            <LargeButton
              text="Add person"
              onPress={onAddPersonPressed}
              icon="account-plus"
            />
          </View>
        </View>
        <View style={globalStyles.flex} />
      </KeyboardAwareScrollView>
    </ErrorBoundary>
  );
};

AddPersonPrompt.propTypes = {
  navigation: PropTypes.object,
};

export default AddPersonPrompt;
