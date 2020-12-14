/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { useMemo } from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import GroupList from '../group-list';
import {
  selectGroupByLocationId,
  createSelectPersonnelByLocationId,
  selectSelectedLocationId,
  selectSelectedPersonnel,
  selectTheme,
} from '../../redux/selectors';
import {
  toggleGroup,
  selectPerson,
  deselectPerson,
  clearSelectedPersonnel,
  movePerson,
} from '../../redux/actions';
import { STAGING } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const Group = ({
  locationId,
  groupMode,
  setGroupModeHandler,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectPersonnelByLocationId = useMemo(createSelectPersonnelByLocationId, []);
  const personnel = useSelector(state =>
    selectPersonnelByLocationId(state, locationId)
  );
  const selectedLocationId = useSelector(state => selectSelectedLocationId(state));
  const group = useSelector(state => selectGroupByLocationId(state, locationId));
  const selectedGroup = useSelector(state =>
    selectGroupByLocationId(state, selectedLocationId)
  );
  const selectedPersonnel = useSelector(state => selectSelectedPersonnel(state));
  const theme = useSelector(state => selectTheme(state));

  const allPersonnelSelected = personnel.every(person => selectedPersonnel.some(selectedPerson => selectedPerson.id  === person.id));

  const onSelectAllPressed = () => {
    personnel.forEach(item => {
      allPersonnelSelected
        ? dispatch(deselectPerson(item, locationId))
        : dispatch(selectPerson(item, locationId));
    });
  };

  const onGroupPressed = () => {
    if (groupMode === 'add') {
      dispatch(toggleGroup(group, true));
    } else if (groupMode === 'remove') {
      Alert.alert(
        'Remove group?',
        'All personnel will be returned to staging',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch(toggleGroup(group, false));
            },
          },
        ]
      );
    } else if (groupMode === 'edit') {
      const { navigate } = navigation;
      navigate('EditGroupPrompt', { group });
    } else {
      // set each selected id's new locationId to the current group
      selectedPersonnel.forEach(person => {
        dispatch(
          movePerson(
            person,
            // To report prev location
            selectedGroup || { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
            group
          )
        );
      });
      dispatch(clearSelectedPersonnel());
    }
    setGroupModeHandler('');
  };

  const { name, visibility } = group;

  const renderOverlay = visibility
    ? groupMode === 'remove' ||
      groupMode === 'edit' ||
      (selectedLocationId && selectedLocationId !== locationId)
      ? true
      : false
    : groupMode === 'add'
    ? true
    : false;

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {renderOverlay && (
        <TouchableOpacity style={styles.overlay} onPress={onGroupPressed} />
      )}
      {visibility && (
        <>
          <TouchableOpacity onPress={onSelectAllPressed} style={styles.header}>
            <Text style={styles.headerContent}> {name.toUpperCase()} </Text>
          </TouchableOpacity>
          <GroupList locationId={locationId} personnel={personnel} />
        </>
      )}
    </View>
  );
};

// props validation
Group.propTypes = {
  locationId: PropTypes.string,
  setGroupModeHandler: PropTypes.func,
  groupMode: PropTypes.string,
};

export default Group;
