/**
 * EndScreen component
 *
 * Manages displaying the end screen after an incident.
 */

import React, {useState} from 'react';
import {Alert, View, Text, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ErrorBoundary} from 'react-error-boundary';
import PropTypes from 'prop-types';

import {LargeButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {selectReportData, selectTheme} from '../../redux/selectors';
import {resumeIncident, toIncidentStack} from '../../redux/actions';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';

const EndScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));
  const reportData = useSelector((state) => selectReportData(state));

  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const onResumeIncidentPressed = () => {
    Alert.alert('Are you sure you want to resume the incident?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
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

    reportData.LOCATION = location;
    if (notes) {
      reportData.NOTES = notes;
    }

    const {navigate} = navigation;
    navigate('SavePrompt', {reportData});
  };

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);

  const onReset = () => {
    setLocation('');
    setNotes('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[location, notes]}>
      <View style={globalStyles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <Text style={globalStyles.label}>Location *</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={(_location) => setLocation(_location)}
            value={location}
            maxLength={36}
            selectionColor={colors.primary}
            disableFullscreenUI={true}
          />
          <Text style={globalStyles.label}>Notes</Text>
          <TextInput
            style={globalStyles.multilineInput}
            multiline={true}
            onChangeText={(_notes) => setNotes(_notes)}
            value={notes}
            maxLength={36}
            selectionColor={colors.primary}
            disableFullscreenUI={true}
          />
          <LargeButton
            text="Resume incident"
            onPress={onResumeIncidentPressed}
            icon="restart"
          />
          <LargeButton
            text="Continue"
            onPress={onContinuePressed}
            icon="arrow-right"
            priority={true}
          />
        </KeyboardAwareScrollView>
      </View>
    </ErrorBoundary>
  );
};

EndScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EndScreen;
