/**
 * StagingList Component
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByGroup,
  getSelectedGroup,
  getSelectedPersonnelGroups,
} from '../../reducers';
import { clearSelectedPersonnel, setPersonGroup } from '../../actions';
import GroupItem from './GroupItem';
import { STAGING, ROSTER } from '../../modules/groupIds';

class StagingList extends React.PureComponent {
  constructor() {
    super();
  }

  _onPress = () => {
    const {
      selectedPersonnelGroups,
      clearSelectedPersonnel,
      setPersonGroup,
    } = this.props;

    // set each selected ids new groupId to the current group
    selectedPersonnelGroups.forEach(personGroup => {
      const { person, group: prevGroup } = personGroup;

      setPersonGroup(
        person,
        prevGroup || { groupId: ROSTER, name: 'Roster' }, // Set prev group to roster if no prev group in redux
        { groupId: STAGING, name: 'Staging' }
      );
    });
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    return <GroupItem groupId={STAGING} item={item} />;
  };

  _keyExtractor = item => item.id;

  render() {
    const { personnel, selectedGroup } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedGroup === '' || selectedGroup === STAGING
        }
        style={styles.listContainer}
      >
        <FlatList
          data={personnel}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          extraData={this.props}
        />
      </TouchableOpacity>
    );
  }
}

StagingList.propTypes = {
  groupId: PropTypes.string,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonGroup: PropTypes.func,
  personnel: PropTypes.array,
  selectedGroup: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByGroup(state, STAGING),
    selectedGroup: getSelectedGroup(state),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setPersonGroup,
})(StagingList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
