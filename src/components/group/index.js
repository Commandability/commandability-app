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

class Group extends Component {
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
        clearSelectedPersonnel,
        setPersonLocationId,
        group,
        selectedGroup,
        selectedPersonnel,
      } = this.props;

      // set each selected id's new locationId to the current group
      selectedPersonnel.forEach(person => {
        setPersonLocationId(
          person,
          // To report prev location
          selectedGroup || { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
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
Group.propTypes = {
  setVisibility: PropTypes.func,
  navigation: PropTypes.object,
  group: PropTypes.object,
  selectedGroup: PropTypes.object,
  personnel: PropTypes.array,
  selectedLocationId: PropTypes.string,
  selectedPersonnel: PropTypes.array,
  selectPerson: PropTypes.func,
  deselectPerson: PropTypes.func,
  locationId: PropTypes.string,
  allPersonnelSelected: PropTypes.bool,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
  groupSelectedHandler: PropTypes.func,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { locationId } = ownProps;
  const personnel = getPersonnelByLocationId(state, locationId);
  const selectedLocationId = getSelectedLocationId(state);

  return {
    personnel,
    selectedLocationId,
    group: getGroupByLocationId(state, locationId),
    selectedGroup: getGroupByLocationId(state, selectedLocationId),
    selectedPersonnel: getSelectedPersonnel(state),
    allPersonnelSelected: allPersonnelSelected(state, personnel),
    theme: getTheme(state),
  };
};

const ConnectWrapper = connect(
  mapStateToProps,
  {
    setVisibility,
    selectPerson,
    deselectPerson,
    clearSelectedPersonnel,
    setPersonLocationId,
  }
)(Group);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
