/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GroupList from '../group-list';
import {
  getGroupByLocationId,
  getPersonnelByLocationId,
  personIsSelected,
} from '../../redux/selectors';
import {
  setVisibility,
  selectPerson,
  deselectPerson,
} from '../../redux/actions';
import styles from './styles';

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

  _onGroupSelected = () => {
    const {
      groupSelectedHandler,
      addGroupMode,
      removeGroupMode,
      editGroupMode,
      setVisibility,
      group,
      navigation: { navigate },
    } = this.props;

    if (addGroupMode) {
      setVisibility(group, true);
    }
    if (removeGroupMode) {
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
    }
    if (editGroupMode) {
      navigate('GroupPrompt', group);
    }
    groupSelectedHandler();
  };

  render() {
    const {
      group: { name, visibility, locationId },
      addGroupMode,
      removeGroupMode,
      editGroupMode,
    } = this.props;

    return (
      <View style={styles.groupLayout}>
        {((visibility && (removeGroupMode || editGroupMode)) ||
          (!visibility && addGroupMode)) && (
          <TouchableOpacity
            style={
              (addGroupMode || removeGroupMode || editGroupMode) &&
              styles.groupSelect
            }
            onPress={this._onGroupSelected}
            disabled={
              addGroupMode || removeGroupMode || editGroupMode ? false : true
            }
          />
        )}
        {visibility && (
          <>
            <TouchableOpacity
              onPress={this._onSelectAllPressed}
              style={styles.groupHeader}
            >
              <Text style={styles.groupHeaderContent}> {name} </Text>
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
  personnel: PropTypes.array,
  selectPerson: PropTypes.func,
  deselectPerson: PropTypes.func,
  locationId: PropTypes.string,
  allPersonnelSelected: PropTypes.bool,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
  groupSelectedHandler: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { locationId } = ownProps;

  const personnel = getPersonnelByLocationId(state, locationId);

  return {
    group: getGroupByLocationId(state, locationId),
    personnel,
    allPersonnelSelected: personnel.every(person =>
      personIsSelected(state, person)
    ),
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    {
      setVisibility,
      selectPerson,
      deselectPerson,
    }
  )(Group)
);
