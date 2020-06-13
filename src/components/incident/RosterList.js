/**
 * RosterList Component
 *
 * Manages displaying personnel in the roster.
 */

import React from 'react';
import { Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByLocationId,
  getSelectedLocationId,
  getSelectedPersonnelGroups,
} from '../../reducers';
import { clearSelectedPersonnel, setPersonLocationId } from '../../actions';
import RosterItem from './RosterItem';
import { ROSTER, STAGING } from '../../modules/locationIds';

class RosterList extends React.PureComponent {
  constructor() {
    super();
  }

  _onPress = () => {
    const {
      selectedPersonnelGroups,
      clearSelectedPersonnel,
      setPersonLocationId,
    } = this.props;

    Alert.alert(
      'Remove selected personnel from incident?',
      'All selected personnel will be returned to the roster list and marked as off-scene in the report. ',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: () => {
            // set each selected id's new locationId to the current group
            selectedPersonnelGroups.forEach(personGroup => {
              const { person, group: prevGroup } = personGroup;
              return setPersonLocationId(
                person,
                prevGroup || { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
                { locationId: ROSTER, name: 'Roster' }
              );
            });
            clearSelectedPersonnel();
          },
        },
      ]
    );
  };

  _renderItem = ({ item }) => {
    return <RosterItem item={item} />;
  };

  _keyExtractor = item => item.id;

  render() {
    const { personnel, selectedGroup } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={styles.listContainer}
        disabled={selectedGroup === '' || selectedGroup === ROSTER}
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

// props validation
RosterList.propTypes = {
  locationId: PropTypes.string,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  personnel: PropTypes.array,
  selectedGroup: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocationId(state, ROSTER),
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
)(RosterList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
