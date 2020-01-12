/**
 * RosterItem Component
 * Manages displaying a person in a the roster and sets a persons location in redux to staging when selected.
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSelectedLocation } from '../../reducers';
import { setPersonLocation } from '../../actions';
import { STAGING } from '../../modules/locations';

class RosterItem extends Component {
  constructor() {
    super();
  }

  _onPress = () => {
    const { item, setPersonLocation } = this.props;
    setPersonLocation(item, STAGING);
  };

  render() {
    const { item, groupName, selectedLocation } = this.props;
    return (
      // disable item if a list other than the parent list is selected,
      // so items can be moved to the items parent list
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == groupName || selectedLocation == '' ? false : true
        }
      >
        <View>
          <Text>{`${item.badge} - ${item.firstName} ${item.lastName}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// props validation
RosterItem.propTypes = {
  setPersonLocation: PropTypes.func,
  groupName: PropTypes.string,
  item: PropTypes.object, // the current person
  location: PropTypes.string,
  selectedLocation: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    selectedLocation: getSelectedLocation(state),
  };
};

export default connect(mapStateToProps, { setPersonLocation })(RosterItem);
