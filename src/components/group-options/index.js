/**
 * GroupOptions Component
 *
 * This component handles the GroupOptions above the incident screen, including:
 *  - the incident timer
 *  - the edit group, remove group, and end incident buttons
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { selectTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const GroupOptions = ({ toggleGroupModeHandler, groupMode }) => {
  const theme = useSelector(state => selectTheme(state));
  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          groupMode === 'add' ? styles.selectedOption : styles.option,
        ]}
        onPress={() => toggleGroupModeHandler('add')}
      >
        <Text
          style={[
            styles.optionContent,
            groupMode === 'add' ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          ADD GROUP{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          groupMode === 'remove' ? styles.selectedOption : styles.option,
        ]}
        onPress={() => toggleGroupModeHandler('remove')}
      >
        <Text
          style={[
            styles.optionContent,
            groupMode === 'remove' ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          REMOVE GROUP{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          groupMode === 'edit' ? styles.selectedOption : styles.option,
        ]}
        onPress={() => toggleGroupModeHandler('edit')}
      >
        <Text
          style={[
            styles.optionContent,
            groupMode === 'edit' ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          EDIT GROUP{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// props validation
GroupOptions.propTypes = {
  toggleGroupModeHandler: PropTypes.func,
  groupMode: PropTypes.string,
};

export default GroupOptions;
