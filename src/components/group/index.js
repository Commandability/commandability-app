/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import GroupList from '../group-list';
import {
  getGroupByLocationId,
  getPersonnelByLocationId,
  getSelectedLocationId,
  personIsSelected,
  getSelectedPersonnelGroups,
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

class _Group extends Component {
  _onAddPressed = () => {
    const { setVisibility, group } = this.props;
    setVisibility(group, true);
  };

  _onSelectAllPressed = () => {
    const {
      locationId,
      personnel,
      allPersonnelSelected,
      selectPerson,
      deselectPerson,
    } = this.props;
    personnel.forEach(item => {
      allPersonnelSelected
        ? deselectPerson(item, locationId)
        : selectPerson(item, locationId);
    });
  };

  _onGroupPressed = () => {
    const {
      groupSelectedHandler,
      addGroupMode,
      removeGroupMode,
      editGroupMode,
      setVisibility,
      group,
    } = this.props;

    if (addGroupMode) {
      setVisibility(group, true);
    } else if (removeGroupMode) {
      Alert.alert(
        'Remove group?',
        'All personnel will be returned to staging',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: 'OK',
            onPress: () => {
              setVisibility(group, false);
            },
          },
        ]
      );
    } else if (editGroupMode) {
      const {
        navigation: { navigate },
      } = this.props;
      navigate('GroupPrompt', { group });
    } else {
      const {
        selectedPersonnelGroups,
        clearSelectedPersonnel,
        setPersonLocationId,
        group,
      } = this.props;

      // set each selected id's new locationId to the current group
      selectedPersonnelGroups.forEach(personGroup => {
        const { person, group: prevGroup } = personGroup;
        setPersonLocationId(
          person,
          // To report prev location
          prevGroup || { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
          group
        );
      });
      clearSelectedPersonnel();
    }
    groupSelectedHandler();
  };

  render() {
    const {
      group: { name, visibility, locationId },
      selectedLocationId,
      addGroupMode,
      removeGroupMode,
      editGroupMode,
      theme,
    } = this.props;

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
            onPress={this._onGroupPressed}
          />
        )}
        {visibility && (
          <>
            <TouchableOpacity
              onPress={this._onSelectAllPressed}
              style={styles.header}
            >
              <Text style={styles.headerContent}> {name.toUpperCase()} </Text>
            </TouchableOpacity>
            <GroupList locationId={locationId} />
          </>
        )}
      </View>
    );
  }
}

// props validation
_Group.propTypes = {
  setVisibility: PropTypes.func,
  navigation: PropTypes.object,
  group: PropTypes.object,
  personnel: PropTypes.array,
  selectedLocationId: PropTypes.string,
  selectPerson: PropTypes.func,
  deselectPerson: PropTypes.func,
  locationId: PropTypes.string,
  allPersonnelSelected: PropTypes.bool,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
  groupSelectedHandler: PropTypes.func,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { locationId } = ownProps;

  const personnel = getPersonnelByLocationId(state, locationId);

  return {
    group: getGroupByLocationId(state, locationId),
    personnel,
    selectedLocationId: getSelectedLocationId(state),
    allPersonnelSelected: personnel.every(person =>
      personIsSelected(state, person)
    ),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
    theme: getTheme(state),
  };
};

const _ = connect(
  mapStateToProps,
  {
    setVisibility,
    selectPerson,
    deselectPerson,
    clearSelectedPersonnel,
    setPersonLocationId,
  }
)(_Group);

// Wrap and export
export default function Group(props) {
  const navigation = useNavigation();

  return <_ {...props} navigation={navigation} />;
}
