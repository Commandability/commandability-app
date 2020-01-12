/**
 * RosterList Component
 * Manages displaying personnel in the roster.
 */

import React from 'react';
import { Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedPersonnel,
} from '../../reducers';
import { clearSelectedPersonnel, setPersonLocation } from '../../actions';
import RosterItem from './RosterItem';
import { ROSTER } from '../../modules/locations';

class RosterList extends React.PureComponent {
  constructor() {
    super();
  }

  _onPress = () => {
    const {
      selectedPersonnel,
      clearSelectedPersonnel,
      setPersonLocation,
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
            // set each selected ids new location to the current group
            selectedPersonnel.forEach(person =>
              setPersonLocation(person, ROSTER)
            );
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
    const { personnel, selectedLocation } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={styles.listContainer}
        disabled={
          selectedLocation === '' || selectedLocation === ROSTER ? true : false
        }
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
  location: PropTypes.string,
  selectedPersonnel: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocation: PropTypes.func,
  personnel: PropTypes.array,
  selectedLocation: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocation(state, ROSTER),
    selectedLocation: getSelectedLocation(state),
    selectedPersonnel: getSelectedPersonnel(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setPersonLocation,
})(RosterList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
