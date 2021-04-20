/**
 * Roster Component
 *
 * Displays the roster and search bar and handles the roster's selection
 */

import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';

import RosterList from '../roster-list';
import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const Roster = () => {
  const theme = useSelector((state) => selectTheme(state));

  const [query, setQuery] = useState('');

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerContent}>ROSTER</Text>
      </View>
      <TextInput
        style={styles.queryInput}
        placeholder="Search"
        placeholderTextColor={colors.text.main}
        onChangeText={(_query) => setQuery(_query)}
        value={query}
        maxLength={36}
        selectionColor={colors.primary}
        disableFullscreenUI={true}
      />
      <RosterList query={query} />
    </View>
  );
};

export default Roster;
