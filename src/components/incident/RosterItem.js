/**
 * RosterItem Component
 * 
 * Manages displaying a person in a the roster and sets a persons location in redux to staging when selected.
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSelectedGroup } from '../../reducers';
import { setPersonGroup } from '../../actions';
import { ROSTER, STAGING } from '../../modules/groups';

class RosterItem extends Component {
  constructor() {
    super();
  }

  _onPress = () => {
    const { item, setPersonGroup } = this.props;
    setPersonGroup(
      item,
      { location: ROSTER, name: 'Roster' },
      { location: STAGING, name: 'Staging' }
    );
  };

  render() {
    const { item, selectedLocation } = this.props;
    return (
      // disable item if a list other than the parent list is selected,
      // so items can be moved to the items parent list
      <TouchableOpacity
        onPress={this._onPress}
        disabled={ selectedLocation == '' ? false : true }
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
  setPersonGroup: PropTypes.func,
  groupName: PropTypes.string,
  item: PropTypes.object, // the current person
  location: PropTypes.string,
  selectedLocation: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    selectedLocation: getSelectedGroup(state),
  };
};

export default connect(mapStateToProps, { setPersonGroup })(RosterItem);
