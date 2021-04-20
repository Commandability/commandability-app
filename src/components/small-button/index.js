/**
 * SmallButton Component
 *
 * Used for all small buttons
 */

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const SmallButton = ({text, onPress, type, selected}) => {
  const theme = useSelector((state) => selectTheme(state));

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  switch (type) {
    case 'navigator':
      return (
        <TouchableOpacity style={styles.opacity} onPress={onPress}>
          <Text style={styles.opacityContent}>{text}</Text>
          <Icon name="arrow-right" style={styles.opacityContent} />
        </TouchableOpacity>
      );
    case 'selector':
      return (
        <TouchableOpacity
          style={[styles.opacity, selected && styles.selectedOpacity]}
          onPress={onPress}>
          <Text
            style={[
              styles.opacityContent,
              selected && styles.selectedOpacityContent,
            ]}>
            {text}
          </Text>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity style={styles.opacity} onPress={onPress}>
          <Text style={styles.opacityContent}>{text}</Text>
        </TouchableOpacity>
      );
  }
};

SmallButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  type: PropTypes.string,
  selected: PropTypes.bool,
};

export default SmallButton;
