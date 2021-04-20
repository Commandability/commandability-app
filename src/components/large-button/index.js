/**
 * LargeButton Component
 *
 * Used for all large buttons
 */

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const LargeButton = ({children, text, onPress, icon, type, priority}) => {
  const theme = useSelector((state) => selectTheme(state));

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  let opacityType = '';
  if (type === 'flex') {
    opacityType = styles.flex;
  } else {
    opacityType = styles.fixed;
  }

  return (
    <TouchableOpacity
      style={[styles.opacity, priority && styles.priority, opacityType]}
      onPress={onPress}>
      <Icon name={icon} style={styles.opacityIcon} />
      <Text style={styles.opacityText}>{text}</Text>
      {children}
    </TouchableOpacity>
  );
};

LargeButton.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  type: PropTypes.string,
  priority: PropTypes.bool,
};

export default LargeButton;
