/**
 * EndScreen component
 *
 * Manages exiting the incident without saving.
 */

import React, { useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { resetIncident, toHomeStack } from '../../redux/actions';
import { selectTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const ExitIncidentPrompt = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const {
    currentUser: { email: userEmail },
  } = auth();

  const [email, setEmail] = useState('');

  const onExitPressed = () => {
    if (email === userEmail) {
      dispatch(resetIncident()); // reset personnel locations and group settings, remove all temporary personnel from state
      dispatch(toHomeStack());
    } else {
      Alert.alert('Incorrect organization email', '', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const onCancelPressed = () => {
    const { goBack } = navigation;
    goBack();
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <View style={styles.backBar}>
          <TouchableOpacity onPress={onCancelPressed}>
            <Icon name="chevron-left" style={styles.backButton} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.promptContainer}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.prompt}>
            <Text style={styles.promptText}>
              {`Are you absolutely sure you want to exit without saving?`}
            </Text>
            <Text style={styles.promptText}>
              <Text>Please type </Text>
              <Text style={styles.email}>{userEmail}</Text>
              <Text> to confirm.</Text>
            </Text>
          </View>
          <Text style={styles.label}>Organization email *</Text>
          <TextInput
            style={styles.emailInput}
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
            value={email}
          />
          <TouchableOpacity style={styles.opacity} onPress={onExitPressed}>
            <Text style={styles.opacityText}>Exit Without Saving</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

ExitIncidentPrompt.propTypes = {
  navigation: PropTypes.object,
};

export default ExitIncidentPrompt;
