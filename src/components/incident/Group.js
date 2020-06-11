/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';
import GroupList from './GroupList';
import {
  getGroupByLocationId,
  getPersonnelByLocationId,
  personIsSelected,
} from '../../reducers';
import { setVisibility, selectPerson, deselectPerson } from '../../actions';

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
      setVisibility(group, false);
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
            <TouchableOpacity onPress={this._onSelectAllPressed}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupHeaderContent}> {name} </Text>
              </View>
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

const styles = StyleSheet.create({
  groupSelect: {
    // backgroundColor: `rgba(52, 52, 52, 0.8)`
    backgroundColor: `blue`,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  groupLayout: {
    flex: 1,
    flexDirection: 'column',
    padding: 4,
  },
  groupHeader: {
    flexDirection: 'row',
    height: 20,
    padding: 5,
    backgroundColor: colors.secondary.dark,
  },
  groupHeaderContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.primary.text,
  },
});
