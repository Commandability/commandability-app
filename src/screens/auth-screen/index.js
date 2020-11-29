/**
 * AuthScreen component
 *
 * Manages displaying the login page.
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';

import { getTheme } from '../../redux/selectors';
import { signIn } from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => getTheme(state));

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('commandabilityapp@gmail.com');
  const [password, setPassword] = useState('dev-password');

  const onSignInPressed = async () => {
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      setLoading(true);
      try {
        await dispatch(signIn(email, password));
      } catch (error) {
        let message = '';
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'The email address you entered is invalid. ';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            message =
              'The username and password you entered do not match our records. ';
            break;
          default:
            message = 'Unknown error. ';
        }
        Alert.alert('Error', message, [
          {
            text: 'OK',
          },
        ]);
        setLoading(false);
        setPassword('');
      }
    } else {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status. ',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={email => setEmail(email)}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={password => setPassword(password)}
            value={password}
          />
          <TouchableOpacity
            style={styles.opacity}
            onPress={onSignInPressed}
            disabled={email && password ? false : true}
          >
            <Icon name="login" style={styles.icon} />
            <Text style={styles.iconText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={colors.primary}
          size={'large'}
        />
      )}
    </View>
  );
};

export default AuthScreen;
