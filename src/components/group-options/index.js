/**
 * GroupOptions Component
 *
 * This component handles the GroupOptions above the incident screen, including:
 *  - the incident timer
 *  - the edit group, remove group, and end incident buttons
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Text, View } from 'react-native';

import { selectTheme, selectSelectedGroupMode } from '../../redux/selectors';
import { toggleGroupMode } from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const GroupOptions = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const selectedGroupMode = useSelector(state => selectSelectedGroupMode(state));
  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  const onAddPressed = () => {
    dispatch(toggleGroupMode('add'));
  };

  const onRemovePressed = () => {
    dispatch(toggleGroupMode('remove'));
  };

  const onEditPressed = () => {
    dispatch(toggleGroupMode('edit'));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGroupMode === 'add' ? styles.selectedOption : styles.option,
        ]}
        onPress={onAddPressed}
      >
        <Text
          style={[
            styles.optionContent,
            selectedGroupMode === 'add' ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          ADD GROUP{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGroupMode === 'remove' ? styles.selectedOption : styles.option,
        ]}
        onPress={onRemovePressed}
      >
        <Text
          style={[
            styles.optionContent,
            selectedGroupMode === 'remove' ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          REMOVE GROUP{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGroupMode === 'edit' ? styles.selectedOption : styles.option,
        ]}
        onPress={onEditPressed}
      >
        <Text
          style={[
            styles.optionContent,
            selectedGroupMode === 'edit' ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          EDIT GROUP{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupOptions;
