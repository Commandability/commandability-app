/**
 * SmallButton Component
 *
 * Used for all small buttons
 */

import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const SmallButton = ({text, onPress, type, selected, style: passedStyles}) => {
  const theme = useSelector((state) => selectTheme(state));

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  switch (type) {
    case 'navigator':
      return (
        <View style={passedStyles}>
          <TouchableOpacity style={styles.opacity} onPress={onPress}>
            <Text style={styles.opacityContent}>{text}</Text>
            <Icon name="arrow-right" style={styles.opacityContent} />
          </TouchableOpacity>
        </View>
      );
    case 'selector':
      return (
        <View style={passedStyles}>
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
        </View>
      );
    default:
      return (
        <View style={passedStyles}>
          <TouchableOpacity style={styles.opacity} onPress={onPress}>
            <Text style={styles.opacityContent}>{text}</Text>
          </TouchableOpacity>
        </View>
      );
  }
};

SmallButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  type: PropTypes.string,
  selected: PropTypes.bool,
  style: PropTypes.object,
};

export default SmallButton;
