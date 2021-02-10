/**
 * EndScreen component
 *
 * Manages displaying the end screen after an incident.
 */

import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { selectReportData, selectTheme } from '../../redux/selectors';
import {
  endIncident,
  resumeIncident,
  toIncidentStack,
} from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const EndScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const reportData = useSelector(state => selectReportData(state));

  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(endIncident()); // log incident end
  }, []);

  const onResumeIncidentPressed = () => {
    Alert.alert('Are you sure you want to resume the incident?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: async () => {
          dispatch(resumeIncident());
          dispatch(toIncidentStack());
        },
      },
    ]);
  };

  const onContinuePressed = () => {
    if (!location) {
      Alert.alert('Location is required', '', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    reportData['LOCATION'] = location;
    if (notes) {
      reportData['NOTES'] = notes;
    }

    const { navigate } = navigation;
    navigate('SaveReportPrompt', { reportData });
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.locationInput}
          autoCapitalize="none"
          onChangeText={location => setLocation(location)}
          value={location}
        />
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          autoCapitalize="none"
          multiline={true}
          onChangeText={notes => setNotes(notes)}
          value={notes}
        />

        <TouchableOpacity
          style={styles.opacity}
          onPress={onResumeIncidentPressed}
        >
          <Icon name="restart" style={styles.icon} />
          <Text style={styles.opacityText}>Resume incident</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.opacity, styles.opacityHighlight]}
          onPress={onContinuePressed}
        >
          <Icon name="arrow-right" style={styles.icon} />
          <Text style={styles.opacityText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

EndScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EndScreen;
