/**
 * PersonnelArea Component
 *
 * Handles the personnel area, including the staging list, add personnel button, and remove personnel area
 */

import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import SmallButton from '../small-button';
import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';
import RemovePersonnel from '../remove-personnel';
import Staging from '../staging';

const PersonnelArea = () => {
  const navigation = useNavigation();
  const theme = useSelector((state) => selectTheme(state));

  const onAddPersonnelPressed = () => {
    const {navigate} = navigation;
    navigate('AddPersonnelPrompt');
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <SmallButton
        onPress={onAddPersonnelPressed}
        text="ADD PERSONNEL"
        type="navigator"
      />
      <Staging />
      <RemovePersonnel />
    </View>
  );
};

export default PersonnelArea;
