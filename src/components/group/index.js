/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import GroupList from '../group-list';
import {
  getGroupByLocationId,
  getPersonnelByLocationId,
  getSelectedLocationId,
  getSelectedPersonnel,
  allPersonnelSelected,
  getTheme,
} from '../../redux/selectors';
import {
  setVisibility,
  selectPerson,
  deselectPerson,
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import { STAGING } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const Group = ({ locationId, addGroupMode, removeGroupMode, editGroupMode, groupSelectedHandler }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const personnel = useSelector(state => getPersonnelByLocationId(state, locationId));
  const selectedLocationId = useSelector(state => getSelectedLocationId(state));
  const group = useSelector(state => getGroupByLocationId(state, locationId));
  const selectedGroup = useSelector(state => getGroupByLocationId(state, selectedLocationId));
  const selectedPersonnel = useSelector(state => getSelectedPersonnel(state));
  const _allPersonnelSelected = useSelector(state => allPersonnelSelected(state, personnel));
  const theme = useSelector(state => getTheme(state));


  const onSelectAllPressed = () => {
    personnel.forEach(item => {
      _allPersonnelSelected
        ? dispatch(deselectPerson(item, locationId))
        : dispatch(selectPerson(item, locationId));
    });
  };

  const onGroupPressed = () => {
    if (addGroupMode) {
      dispatch(setVisibility(group, true));
    } else if (removeGroupMode) {
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
              dispatch(setVisibility(group, false));
            },
          },
        ]
      );
    } else if (editGroupMode) {
      const { navigate } = navigation;
      navigate('EditGroupPrompt', { group });
    } else {
      // set each selected id's new locationId to the current group
      selectedPersonnel.forEach(person => {
        dispatch(setPersonLocationId(
          person,
          // To report prev location
          selectedGroup || { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
          group
        ));
      });
      dispatch(clearSelectedPersonnel());
    }
    groupSelectedHandler();
  };

  const { name, visibility } = group;

  const renderOverlay = visibility
    ? removeGroupMode ||
      editGroupMode ||
      (selectedLocationId && selectedLocationId !== locationId)
      ? true
      : false
    : addGroupMode
    ? true
    : false;

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {renderOverlay && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onGroupPressed}
        />
      )}
      {visibility && (
        <>
          <TouchableOpacity
            onPress={onSelectAllPressed}
            style={styles.header}
          >
            <Text style={styles.headerContent}> {name.toUpperCase()} </Text>
          </TouchableOpacity>
          <GroupList locationId={locationId} />
        </>
      )}
    </View>
  );
};

// props validation
Group.propTypes = {
  locationId: PropTypes.string,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
  groupSelectedHandler: PropTypes.func
};

export default Group;

