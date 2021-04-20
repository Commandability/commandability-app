/**
 * Staging Component
 *
 * Displays the staging list and handles its selection
 */

import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

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
  dealertPersonToGroup,
} from '../../redux/actions';
import {staticLocations} from '../../utils/locations';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const {STAGING} = staticLocations;

const Staging = () => {
  const dispatch = useDispatch();
  const selectedLocationId = useSelector((state) =>
    selectSelectedLocationId(state),
  );
  const selectedGroup = useSelector((state) =>
    selectGroupByLocationId(state, selectedLocationId),
  );
  const selectedPersonnel = useSelector((state) =>
    selectSelectedPersonnel(state),
  );
  const theme = useSelector((state) => selectTheme(state));

  const onStagingPressed = () => {
    // set each selected personId's new locationId to STAGING
    selectedPersonnel.forEach((person) => {
      const {personId} = person;

      if (selectedGroup) {
        const {alerted} = selectedGroup;
        if (alerted.includes(personId)) {
          dispatch(dealertPersonToGroup(selectedGroup, person));
        }
      }

      dispatch(
        movePerson(
          person,
          // To report prev location
          selectedGroup,
          STAGING,
        ),
      );
    });
    dispatch(clearSelectedPersonnel());
  };

  const renderOverlay =
    selectedLocationId && selectedLocationId !== STAGING.locationId
      ? true
      : false;

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {renderOverlay ? (
        <TouchableOpacity style={styles.overlay} onPress={onStagingPressed} />
      ) : null}
      <View style={styles.header}>
        <Text style={styles.headerContent}> STAGING </Text>
      </View>
      <StagingList />
    </View>
  );
};

export default React.memo(Staging);
