/**
 * RosterItem Component
 *
 * Manages displaying a person in a the roster and sets a persons locationId in redux to staging when selected.
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSelectedLocationId } from '../../reducers';
import { setPersonLocationId } from '../../actions';
import { ROSTER, STAGING } from '../../modules/locationIds';

class RosterItem extends Component {
  constructor() {
    super();
    this._onPress = this._onPress.bind(this); // use bind to avoid duplicating methods on demanding components
  }

  _onPress(){
    const { item, setPersonLocationId } = this.props;
    setPersonLocationId(
      item,
      { locationId: ROSTER, name: 'Roster' },
      { locationId: STAGING, name: 'Staging' }
    );
  }

  render() {
    const {
      item: { badge, firstName, lastName },
      selectedGroup,
    } = this.props;
    return (
      // disable item if a list other than the parent list is selected,
      // so items can be moved to the items parent list
      <TouchableOpacity
        onPress={this._onPress}
        disabled={selectedGroup == '' ? false : true}
      >
        <View>
          <Text>{`${badge} - ${firstName} ${lastName}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// props validation
RosterItem.propTypes = {
  setPersonLocationId: PropTypes.func,
  groupName: PropTypes.string,
  item: PropTypes.object, // the current person
  locationId: PropTypes.string,
  selectedGroup: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    selectedGroup: getSelectedLocationId(state),
  };
};

export default connect(mapStateToProps, { setPersonLocationId })(RosterItem);
