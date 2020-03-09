/**
 * GroupList Component
 * 
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getGroupById,
  getPersonnelByGroup,
  getSelectedGroup,
  getSelectedPersonnelGroups,
} from '../../reducers';
import { clearSelectedPersonnel, setPersonGroup } from '../../actions';
import GroupItem from './GroupItem';
import { STAGING } from '../../modules/groups';

class GroupList extends React.PureComponent {
  onPress = () => {
    const {
      selectedPersonnelGroups,
      clearSelectedPersonnel,
      setPersonGroup,
      group,
    } = this.props;

    // set each selected ids new location to the current group
    selectedPersonnelGroups.forEach(personGroup => {
      const { person, group: prevGroup } = personGroup;
      setPersonGroup(
        person,
        prevGroup || { location: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
        group
      );
    });
    clearSelectedPersonnel();
  };

  renderItem = ({ item }) => {
    const { location } = this.props;
    return <GroupItem location={location} item={item} />;
  };

  keyExtractor = item => item.id;

  render() {
    const { location, personnel, selectedGroup } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        disabled={
          selectedGroup === '' || selectedGroup === location
        }
        style={styles.listContainer}
      >
        <FlatList
          data={personnel}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={this.props}
        />
      </TouchableOpacity>
    );
  }
}

// props validation
GroupList.propTypes = {
  location: PropTypes.string,
  group: PropTypes.object,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonGroup: PropTypes.func,
  personnel: PropTypes.array,
  selectedGroup: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return {
    group: getGroupById(state, location),
    personnel: getPersonnelByGroup(state, location),
    selectedGroup: getSelectedGroup(state),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setPersonGroup,
})(GroupList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
