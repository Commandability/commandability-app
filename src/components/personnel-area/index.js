/**
 * PersonnelArea Component
 *
 * This component handles the personnel area, including the staging list, add personnel button, and remove personnel area
 *
 */

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { selectTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';
import RemovePersonnel from '../remove-personnel';
import Staging from '../staging';

const PersonnelArea = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => selectTheme(state));

  const onAddPersonnelPressed = () => {
    const { navigate } = navigation;
    navigate('AddPersonnelPrompt');
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={onAddPersonnelPressed}>
        <Text style={styles.optionContent}>ADD PERSONNEL</Text>
        <Icon name="arrow-right" style={styles.optionContent} />
      </TouchableOpacity>
      <Staging />
      <RemovePersonnel />
    </View>
  );
};

export default PersonnelArea;
