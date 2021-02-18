/**
 * ExitWithoutSavingPrompt component
 *
 * Manages exiting the incident without saving.
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import { ErrorBoundary } from 'react-error-boundary';

import { BackButton } from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import { resetIncident, toHomeStack } from '../../redux/actions';
import { selectTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const ExitWithoutSavingPrompt = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const { currentUser } = auth();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('dev-password');

  const onExitPressed = async () => {
    if (!password) {
      Alert.alert("Please enter your organization's password", '', [
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
    const credential = auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    try {
      await currentUser.reauthenticateWithCredential(credential);
      dispatch(resetIncident()); // reset personnel locations and group settings, remove all temporary personnel from state
      dispatch(toHomeStack());
    } catch (error) {
      let message = '';
      if (error.message == 'auth/wrong-password') {
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
  const styles = createStyleSheet(colors);

  const onReset = () => {
    setLoading(false);
    setPassword('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[loading, password]}
    >
      <View style={styles.container}>
        <BackButton />
        <View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.prompt}>
              <Text style={styles.promptText}>
                Are you absolutely sure you want to exit without saving?
              </Text>
              <Text style={styles.promptText}>
                Please enter your password to confirm
              </Text>
            </View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.passwordInput}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={password => setPassword(password)}
              value={password}
            />
            <TouchableOpacity style={styles.opacity} onPress={onExitPressed}>
              <Icon name="cancel" style={styles.icon} />
              <Text style={styles.opacityText}>Exit Without Saving</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
        {loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.primary}
            size={'large'}
          />
        )}
      </View>
    </ErrorBoundary>
  );
};

export default ExitWithoutSavingPrompt;