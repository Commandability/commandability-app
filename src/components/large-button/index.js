/**
 * LargeButton Component
 *
 * Used for all large buttons
 */

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const LargeButton = ({text, onPress, icon, type = 'contained'}) => {
  const theme = useSelector((state) => selectTheme(state));

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <TouchableOpacity
      style={[
        styles.opacity,
        type === 'contained' && styles.contained,
        type === 'outlined' && styles.outlined,
      ]}
      onPress={onPress}>
      <Icon
        name={icon}
        style={[
          styles.opacityText,
          styles.opacityIcon,
          type === 'contained' && styles.containedText,
          type === 'outlined' && styles.outlinedText,
        ]}
      />
      <Text
        style={[
          styles.opacityText,
          type === 'contained' && styles.containedText,
          type === 'outlined' && styles.outlinedText,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

LargeButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  type: PropTypes.string,
};

export default LargeButton;
