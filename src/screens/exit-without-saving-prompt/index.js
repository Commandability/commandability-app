/**
 * ExitWithoutSavingPrompt component
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  View,
  TextInput,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import {ErrorBoundary} from 'react-error-boundary';

import {BackButton, LargeButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {resetIncident, toHomeStack} from '../../redux/actions';
import {selectTheme} from '../../redux/selectors';
import {DARK} from '../../utils/themes';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';

const ExitWithoutSavingPrompt = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));
  const {currentUser} = auth();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const onExitPressed = async () => {
    if (!password) {
      Alert.alert("Please enter your organization's password", '', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    const {isConnected} = await NetInfo.fetch();
    if (!isConnected) {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status.',
        [
          {
            text: 'OK',
          },
        ],
      );
      return;
    }

    setLoading(true);
    const credential = auth.EmailAuthProvider.credential(
      currentUser.email,
      password,
    );
    try {
      await currentUser.reauthenticateWithCredential(credential);
      dispatch(resetIncident()); // Reset personnel locations and group settings, remove all temporary personnel from state
      dispatch(toHomeStack());
    } catch (error) {
      let message = '';
      // Error.code provided by firebase
      if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password.';
      } else {
        message = 'Unknown error.';
      }
      Alert.alert('Error', message, [
        {
          text: 'OK',
        },
      ]);
    }
    setLoading(false);
    setPassword('');
  };

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);

  const onReset = () => {
    setLoading(false);
    setPassword('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[loading, password]}>
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
            <View style={globalStyles.prompt}>
              <Text style={globalStyles.promptHeader}>Exit without saving</Text>
              <Text style={globalStyles.promptText}>
                Are you sure you want to exit without saving?
              </Text>
            </View>
            <Text style={globalStyles.label}>Password</Text>
            <TextInput
              style={globalStyles.input}
              secureTextEntry
              onChangeText={(_password) => setPassword(_password)}
              value={password}
              maxLength={36}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
              autoCapitalize="none"
            />
            <LargeButton
              text="Exit without saving"
              onPress={onExitPressed}
              icon="cancel"
            />
          </View>
        </View>
        <View style={globalStyles.flex} />
      </KeyboardAwareScrollView>
      {loading ? (
        <ActivityIndicator
          style={globalStyles.activityIndicator}
          color={colors.primary}
          size={'large'}
        />
      ) : null}
    </ErrorBoundary>
  );
};

export default ExitWithoutSavingPrompt;
