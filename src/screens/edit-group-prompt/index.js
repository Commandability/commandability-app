/**
 * EditGroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

import { selectTheme } from '../../redux/selectors';
import { editGroup } from '../../redux/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

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
          <Text style={styles.label}>Group name *</Text>
          <TextInput
            style={styles.nameInput}
            autoCapitalize="none"
            value={newName}
            onChangeText={newName => setNewName(newName)}
          />
          <TouchableOpacity style={styles.opacity} onPress={onSavePressed}>
            <Icon name="check" style={styles.icon} />
            <Text style={styles.opacityText}>Save</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

// props validation
EditGroupPrompt.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditGroupPrompt;
