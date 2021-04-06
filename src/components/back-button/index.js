/**
 * BackButton Component
 *
 * This component handles the back button on screens
 */

import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { selectTheme } from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const BackButton = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => selectTheme(state));

  const onCancelPressed = () => {
    const { goBack } = navigation;
    goBack();
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return Platform.OS === 'android' ? (
    <TouchableOpacity onPress={onCancelPressed} style={styles.backOpacity}>
      <Icon name="chevron-left" style={styles.backIcon} />
    </TouchableOpacity>
  ) : null;
};

export default BackButton;
