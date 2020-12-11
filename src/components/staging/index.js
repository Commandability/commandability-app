/**
 * Staging Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import StagingList from '../staging-list';
import {
  selectGroupByLocationId,
  selectSelectedLocationId,
  selectSelectedPersonnel,
  selectTheme,
} from '../../redux/selectors';
import {
  clearSelectedPersonnel,
  movePerson,
} from '../../redux/actions';
import { STAGING } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const Staging = () => {
  const dispatch = useDispatch();
  const selectedLocationId = useSelector(state => selectSelectedLocationId(state));
  const selectedGroup = useSelector(state =>
    selectGroupByLocationId(state, selectedLocationId)
  );
  const selectedPersonnel = useSelector(state => selectSelectedPersonnel(state));
  const theme = useSelector(state => selectTheme(state));

  const onStagingPressed = () => {
    // set each selected id's new locationId to STAGING
    selectedPersonnel.forEach(person => {
      dispatch(
        movePerson(
          person,
          // To report prev location
          selectedGroup,
          { locationId: STAGING, name: 'Staging' }
        )
      );
    });
    dispatch(clearSelectedPersonnel());
  };

  const renderOverlay =
    selectedLocationId && selectedLocationId !== STAGING ? true : false;

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {renderOverlay && (
        <TouchableOpacity style={styles.overlay} onPress={onStagingPressed} />
      )}
      <View style={styles.header}>
        <Text style={styles.headerContent}> STAGING </Text>
      </View>
      <StagingList />
    </View>
  );
};

export default Staging;
