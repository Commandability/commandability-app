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
import PropTypes from 'prop-types';

import { BackButton, LargeButton } from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import { selectTheme } from '../../redux/selectors';
import { editGroup } from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createGlobalStyleSheet from '../../modules/global-styles';

const EditGroupPrompt = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const {
    params: {
      group: { name: currName },
    },
  } = route;
  const [newName, setNewName] = useState(currName);

  const onSavePressed = () => {
    if (newName) {
      const { goBack } = navigation;
      const {
        params: { group },
      } = route;

      dispatch(editGroup(group, { name: newName }));
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
              value={newName}
              onChangeText={newName => setNewName(newName)}
            />
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
