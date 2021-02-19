/**
 * AuthScreen component
 *
 * Manages displaying the login page.
 */

import React, { useState } from 'react';
import { ActivityIndicator, Alert, TextInput, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { ErrorBoundary } from 'react-error-boundary';

import { LargeButton } from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import { selectTheme } from '../../redux/selectors';
import { signIn } from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createGlobalStyleSheet from '../../modules/global-styles';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('commandabilityapp@gmail.com'); // For Development
  const [password, setPassword] = useState('dev-password'); // For Development
  // const [email, setEmail] = useState(''); // For Production
  // const [password, setPassword] = useState(''); // For Production

  const onSignInPressed = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both an email and password', '', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    const { isConnected } = await NetInfo.fetch();
    if (!isConnected) {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status.',
        [
          {
            text: 'OK',
          },
        ]
      );
      return;
    }

    setLoading(true);
    try {
      await dispatch(signIn(email, password));
    } catch (error) {
      let message = '';
      switch (error.message) {
        case 'auth/invalid-email':
          message = 'The email address you entered is invalid.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = 'Incorrect email or password.';
          break;
        default:
          message = 'Unknown error.';
      }
      Alert.alert('Error', message, [
        {
          text: 'OK',
        },
      ]);
      setLoading(false);
      setPassword('');
    }
  };

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);

  const onReset = () => {
    setLoading(false);
    setEmail('');
    setPassword('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[loading, email, password]}
    >
      <View style={globalStyles.container}>
        <View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <Text style={globalStyles.label}>Email</Text>
            <TextInput
              style={globalStyles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              value={email}
            />
            <Text style={globalStyles.label}>Password</Text>
            <TextInput
              style={globalStyles.input}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={password => setPassword(password)}
              value={password}
            />
            <LargeButton
              text="Sign in"
              onPress={onSignInPressed}
              icon="login"
            />
          </KeyboardAwareScrollView>
        </View>
        {loading && (
          <ActivityIndicator
            style={globalStyles.activityIndicator}
            color={colors.primary}
            size={'large'}
          />
        )}
      </View>
    </ErrorBoundary>
  );
};

export default AuthScreen;
