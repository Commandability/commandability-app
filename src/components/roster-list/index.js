/**
 * RosterList Component
 *
 * Manages displaying personnel in the roster.
 */

import React from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByLocationId,
  getSelectedLocationId,
  getSelectedPersonnelGroups,
} from '../../redux/selectors';
import {
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import RosterItem from '../roster-item';
import { ROSTER, STAGING } from '../../modules/location-ids';
import styles from './styles';

class RosterList extends React.PureComponent {
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
                // To report prev location
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
    const { personnel, selectedLocationId, query } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={styles.container}
        disabled={selectedLocationId === '' || selectedLocationId === ROSTER}
      >
        <FlatList
          data={
            query
              ? personnel.filter(person => {
                  const { firstName, lastName, badge } = person || undefined;
                  return (
                    firstName.toLowerCase().includes(query) ||
                    lastName.toLowerCase().includes(query) ||
                    (badge ? badge.includes(query) : false)
                  );
                })
              : personnel
          }
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
  selectedLocationId: PropTypes.string,
  query: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocationId(state, ROSTER),
    selectedLocationId: getSelectedLocationId(state),
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
