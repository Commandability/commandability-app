/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility of groups
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
  selectSelectedGroupMode,
} from '../../redux/selectors';
import {
  toggleGroup,
  selectPerson,
  deselectPerson,
  movePerson,
  dealertPersonToGroup,
  clearSelectedPersonnel,
  clearSelectedGroupMode,
} from '../../redux/actions';
import { staticLocations } from '../../utils/locations';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const { STAGING } = staticLocations;

const Group = ({ locationId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectPersonnelByLocationId = useMemo(
    createSelectPersonnelByLocationId,
    []
  );
  const personnel = useSelector(state =>
    selectPersonnelByLocationId(state, locationId)
  );
  const selectedLocationId = useSelector(state =>
    selectSelectedLocationId(state)
  );
  const group = useSelector(state =>
    selectGroupByLocationId(state, locationId)
  );
  const selectedGroup = useSelector(state =>
    selectGroupByLocationId(state, selectedLocationId)
  );
  const selectedPersonnel = useSelector(state =>
    selectSelectedPersonnel(state)
  );
  const selectedGroupMode = useSelector(state =>
    selectSelectedGroupMode(state)
  );
  const theme = useSelector(state => selectTheme(state));

  const allPersonnelSelected = personnel.every(person =>
    selectedPersonnel.some(
      selectedPerson => selectedPerson.personId === person.personId
    )
  );

  const onSelectAllPressed = () => {
    personnel.forEach(item => {
      allPersonnelSelected
        ? dispatch(deselectPerson(item))
        : dispatch(selectPerson(item));
    });
  };

  const onGroupPressed = () => {
    if (selectedGroupMode === 'add') {
      dispatch(toggleGroup(group));
    } else if (selectedGroupMode === 'remove') {
      Alert.alert(
        'Remove group?',
        'All personnel will be returned to staging.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch(toggleGroup(group));
            },
          },
        ]
      );
    } else if (selectedGroupMode === 'edit') {
      const { navigate } = navigation;
      navigate('EditGroupPrompt', { group });
    } else {
      // set each selected personId's new locationId to the current group
      selectedPersonnel.forEach(person => {
        const { personId } = person;

        if (selectedGroup) {
          const { alerted } = selectedGroup;
          if (alerted.includes(personId)) {
            dispatch(dealertPersonToGroup(selectedGroup, person));
          }
        }

        dispatch(
          movePerson(
            person,
            // To report prev location
            selectedGroup ?? STAGING, // Set prev group to staging if no prev group in redux
            group
          )
        );
      });
      dispatch(clearSelectedPersonnel());
    }

    dispatch(clearSelectedGroupMode());
  };

  const { name, isVisible, alerted } = group;

  const renderOverlay = isVisible
    ? selectedGroupMode === 'remove' ||
      selectedGroupMode === 'edit' ||
      (selectedLocationId && selectedLocationId !== locationId)
      ? true
      : false
    : selectedGroupMode === 'add'
    ? true
    : false;

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {renderOverlay ? (
        <TouchableOpacity style={styles.overlay} onPress={onGroupPressed} />
      ) : null}
      {isVisible ? (
        <View
          style={[styles.alertContainer, alerted.length !== 0 && styles.alert]}
        >
          <TouchableOpacity onPress={onSelectAllPressed} style={styles.header}>
            <Text style={styles.headerContent}>{name.toUpperCase()}</Text>
          </TouchableOpacity>
          <GroupList locationId={locationId} />
        </View>
      ) : null}
    </View>
  );
};

// props validation
Group.propTypes = {
  locationId: PropTypes.string,
};

export default React.memo(Group);
