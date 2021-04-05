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
import { Picker } from '@react-native-picker/picker';

const alertTimes = [1, 2, 5, 10, 15, 20, 25, 30];

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
          <Text style={styles.label}>Group alerts</Text>
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
