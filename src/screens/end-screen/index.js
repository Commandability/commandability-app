/**
 * EndScreen component
 *
 * Add location and description to report
 */

import React, {useState} from 'react';
import {Alert, StatusBar, View, Text, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ErrorBoundary} from 'react-error-boundary';
import PropTypes from 'prop-types';

import {LargeButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {selectReportData, selectTheme} from '../../redux/selectors';
import {resumeIncident, toIncidentStack} from '../../redux/actions';
import {DARK} from '../../utils/themes';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';

const EndScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));
  const reportData = useSelector((state) => selectReportData(state));

  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

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
    if (description) {
      reportData.DESCRIPTION = description;
    }

    const {navigate} = navigation;
    navigate('SavePrompt', {reportData});
  };

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);

  const onReset = () => {
    setLocation('');
    setDescription('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[location, description]}>
      <StatusBar
        barStyle={theme === DARK ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <View style={globalStyles.flex} />
        <View style={globalStyles.flex}>
          <View style={globalStyles.content}>
            <Text style={globalStyles.label}>Location *</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={(_location) => setLocation(_location)}
              value={location}
              maxLength={48}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
            />
            <Text style={globalStyles.label}>Description</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={(_description) => setDescription(_description)}
              value={description}
              maxLength={96}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
            />
            <LargeButton
              text="Resume"
              onPress={onResumeIncidentPressed}
              icon="rotate-ccw"
              type="outlined"
            />
            <LargeButton
              text="Continue"
              onPress={onContinuePressed}
              icon="arrow-right"
              type="contained"
            />
          </View>
        </View>
        <View style={globalStyles.flex} />
      </KeyboardAwareScrollView>
    </ErrorBoundary>
  );
};

EndScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EndScreen;
