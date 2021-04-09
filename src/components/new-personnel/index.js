/**
 * New Personnel Component
 *
 * Manages displaying the new personnel.
 */

import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import NewPersonnelList from '../new-personnel-list';
import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const NewPersonnel = () => {
  const theme = useSelector((state) => selectTheme(state));
  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerContent}> NEW PERSONNEL </Text>
      </View>
      <NewPersonnelList />
    </View>
  );
};

export default NewPersonnel;
