/**
 * EditGroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ErrorBoundary } from 'react-error-boundary';
import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';

import { BackButton, LargeButton } from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import { selectTheme } from '../../redux/selectors';
import { editGroup } from '../../redux/actions';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';
import createStyleSheet from './styles';

const alertTimes = [5, 10, 15, 20, 25, 30];

const EditGroupPrompt = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const {
    params: {
      group: { name: currName, alert: currAlertTime },
    },
  } = route;

  const [newName, setNewName] = useState(currName);
  const [newAlertTime, setNewAlertTime] = useState(currAlertTime);

  const onSavePressed = () => {
    if (newName || newAlertTime) {
      const { goBack } = navigation;
      const {
        params: { group },
      } = route;

      dispatch(editGroup(group, { name: newName, alert: newAlertTime }));
      goBack();
    } else {
      Alert.alert('Please enter a new name', '', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const globalStyles = createGlobalStyleSheet(colors);

  const onReset = () => {
    setNewName('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[newName]}
    >
      <View style={globalStyles.container}>
        <BackButton />
        <View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <Text style={globalStyles.label}>Group name *</Text>
            <TextInput
              style={globalStyles.input}
              autoCapitalize="none"
              onChangeText={newName => setNewName(newName)}
              value={newName}
              selectionColor={colors.primary}
            />
            <Text style={globalStyles.label}>Group alerts</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currAlertTime}
                onValueChange={newAlertTime => setNewAlertTime(newAlertTime)}
                style={styles.picker}
              >
                <Picker.Item key={0} label="Disabled" value={0} />
                {alertTimes.map(time => (
                  <Picker.Item
                    key={time}
                    label={`${time} minutes`}
                    value={time}
                  />
                ))}
              </Picker>
            </View>
            <LargeButton text="Save" onPress={onSavePressed} icon="check" />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </ErrorBoundary>
  );
};

// props validation
EditGroupPrompt.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditGroupPrompt;
