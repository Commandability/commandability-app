/**
 * GroupList Component
 *
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getGroupByLocationId,
  getPersonnelByLocationId,
  getSelectedLocationId,
  getSelectedPersonnelGroups,
} from '../../redux/selectors';
import {
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import ListItem from '../list-item';
import { STAGING } from '../../modules/location-ids';
import styles from './styles';

class GroupList extends React.PureComponent {
  onPress = () => {
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
        prevGroup || { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
        group
      );
    });
    clearSelectedPersonnel();
  };

  renderItem = ({ item }) => {
    const { locationId } = this.props;
    return <ListItem locationId={locationId} item={item} />;
  };

  keyExtractor = item => item.id;

  render() {
    const { locationId, personnel, selectedGroup } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        disabled={selectedGroup === '' || selectedGroup === locationId}
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
  locationId: PropTypes.string,
  group: PropTypes.object,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  personnel: PropTypes.array,
  selectedGroup: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { locationId } = ownProps;
  return {
    group: getGroupByLocationId(state, locationId),
    personnel: getPersonnelByLocationId(state, locationId),
    selectedGroup: getSelectedLocationId(state),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
  };
};

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    setPersonLocationId,
  }
)(GroupList);
