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
  getGroupByLocationId,
  getSelectedLocationId,
  getSelectedPersonnel,
  getTheme,
} from '../../redux/selectors';
import {
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import { STAGING } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const Staging = () => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector(state =>
    getGroupByLocationId(state, selectedLocationId)
  );
  const selectedPersonnel = useSelector(state => getSelectedPersonnel(state));
  const theme = useSelector(state => getTheme(state));
  const selectedLocationId = useSelector(state => getSelectedLocationId(state));

  const onStagingPressed = () => {
    // set each selected id's new locationId to STAGING
    selectedPersonnel.forEach(person => {
      dispatch(
        setPersonLocationId(
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
