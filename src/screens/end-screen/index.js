/**
 * EndScreen component
 *
 * Manages displaying the end screen after an incident.
 */

import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { getCurrentReportData, getTheme } from '../../redux/selectors';
import {
  resetIncident,
  endIncident,
  resumeIncident,
  toHomeStack,
  toIncidentStack,
} from '../../redux/actions';
import { saveCurrentReport } from '../../modules/report-manager';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const EndScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => getTheme(state));
  const reportData = useSelector(state => getCurrentReportData(state));

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(endIncident()); // log incident end
  }, []);

  const onSaveAndExitPressed = async () => {
    if (location) {
      reportData['LOCATION'] = location;
      if (notes) {
        reportData['NOTES'] = notes;
      }
      setLoading(true);
      try {
        await saveCurrentReport(reportData);
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
      setLoading(false);
      dispatch(resetIncident()); // reset personnel locations and group settings, remove all temporary personnel from state
      dispatch(toHomeStack());
    } else {
      Alert.alert('Error', 'Location is required.', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const onExitWithoutSavingPressed = () => {
    const { navigate } = navigation;
    navigate('ExitIncidentPrompt');
  };

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
          <Text style={styles.opacityText}>Resume Incident</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.opacity, styles.rowOpacity]}
            onPress={onExitWithoutSavingPressed}
          >
            <Icon name="cancel" style={styles.icon} />
            <Text style={styles.opacityText}>Exit Without Saving</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opacity, styles.rowOpacity]}
            onPress={onSaveAndExitPressed}
          >
            <Icon name="check" style={styles.icon} />
            <Text style={styles.opacityText}>Save and Exit</Text>
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

EndScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EndScreen;
