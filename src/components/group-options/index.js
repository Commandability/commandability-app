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

const GroupOptions = ({
  addGroupHandler,
  removeGroupHandler,
  editGroupHandler,
  addGroupMode,
  removeGroupMode,
  editGroupMode,
}) => {
  const theme = useSelector(state => selectTheme(state));
  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          addGroupMode ? styles.selectedOption : styles.option,
        ]}
        onPress={addGroupHandler}
      >
        <Text
          style={[
            styles.optionContent,
            addGroupMode ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          ADD GROUP{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          removeGroupMode ? styles.selectedOption : styles.option,
        ]}
        onPress={removeGroupHandler}
      >
        <Text
          style={[
            styles.optionContent,
            removeGroupMode ? styles.selected : styles.optionContent,
          ]}
        >
          {' '}
          REMOVE GROUP{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          editGroupMode ? styles.selectedOption : styles.option,
        ]}
        onPress={editGroupHandler}
      >
        <Text
          style={[
            styles.optionContent,
            editGroupMode ? styles.selected : styles.optionContent,
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
  addGroupHandler: PropTypes.func,
  removeGroupHandler: PropTypes.func,
  editGroupHandler: PropTypes.func,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
};

export default GroupOptions;
