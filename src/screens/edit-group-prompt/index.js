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
import DropDownPicker from 'react-native-dropdown-picker'; 

const EditGroupPrompt = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const {
    params: {
      group: { name: currName },
    },
  } = route;
  const [newName, setNewName] = useState(currName);

  const {
    params: {
      group: { alert: alertTime},
    },
  } = route;

  console.log(route);

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
          <Text style={styles.label}>Group Alerts</Text>
          <View style={styles.alertToggle}>
            <DropDownPicker
              items={[
                {label: 'Disabled', value: '0'},
                {label: '5 Minutes', value: '5'},
                {label: '10 Minutes', value: '10'},
                {label: '15 Minutes', value: '15'},
                {label: '20 Minutes', value: '20'},
                {label: '25 Minutes', value: '25'},
                {label: '30 Minutes', value: '30'},
                {label: '35 Minutes', value: '35'},
                {label: '40 Minutes', value: '40'},
                {label: '45 Minutes', value: '45'},
                {label: '50 Minutes', value: '50'},
                {label: '55 Minutes', value: '55'},
                {label: '60 Minutes', value: '60'},
              ]}
              defaultValue={alertTime}
            />
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
