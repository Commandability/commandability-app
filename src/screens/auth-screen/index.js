/**
 * AuthScreen Component
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {ErrorBoundary} from 'react-error-boundary';

import {LargeButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {selectTheme} from '../../redux/selectors';
import {signIn} from '../../redux/actions';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both an email and password', '', [
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
      resetKeys={[loading, email, password]}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={globalStyles.formContainer}>
        <View style={globalStyles.margin} />
        <View style={globalStyles.content}>
          <View>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <Text style={globalStyles.label}>Email</Text>
              <TextInput
                style={globalStyles.input}
                keyboardType="email-address"
                onChangeText={(_email) => setEmail(_email)}
                value={email}
                maxLength={48}
                selectionColor={colors.primary}
                disableFullscreenUI={true}
                autoCapitalize="none"
              />
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
                text="Sign in"
                onPress={onSignInPressed}
                icon="login-variant"
              />
            </KeyboardAwareScrollView>
          </View>
        </View>
        <View style={globalStyles.margin} />
        {loading ? (
          <ActivityIndicator
            style={globalStyles.activityIndicator}
            color={colors.primary}
            size={'large'}
          />
        ) : null}
      </View>
    </ErrorBoundary>
  );
};

export default AuthScreen;
