/**
 * GroupItem Component
 * Manages displaying a person in a group and sets a person as selected in redux and in local state on press.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  getSelectedLocation,
  getLocationUpdateTimeByPerson,
} from '../../reducers';
import { toggleSelectedPersonById } from '../../actions';
import colors from '../../modules/colors';

const MS_IN_MINUTE = 60000;

class GroupItem extends Component {
  constructor(props) {
    super(props);
    const { locationUpdateTime } = this.props;
    this.state = {
      selected: false,
      time: Date.now() - locationUpdateTime,
    };
  }

  componentDidMount() {
    const { locationUpdateTime } = this.props;
    // set first timer manually to reduce interval when remounting component after crash
    this.timeoutID = setTimeout(
      () => {
        this.setState(() => ({
          time: Date.now() - locationUpdateTime,
        }));
        // set recurring timers at constant intervals
        this.intervalID = setInterval(
          () =>
            this.setState(() => ({
              time: Date.now() - locationUpdateTime,
            })),
          MS_IN_MINUTE
        );
      },
      // calculate remaining ms in last count before a new interval should be started
      MS_IN_MINUTE - ((Date.now() - locationUpdateTime) % MS_IN_MINUTE)
    );
  }

  componentWillUnmount() {
    // clear timers to prevent memory leaks
    clearInterval(this.timeoutID);
    clearInterval(this.intervalID);
  }

  _onPress = () => {
    this.setState(prevState => ({
      selected: !prevState.selected,
    }));

    const { item, location, toggleSelectedPersonById } = this.props;
    toggleSelectedPersonById(item.id, location);
  };

  render() {
    const { item, location, selectedLocation } = this.props;
    return (
      // disable item if a list other than the parent list is selected,
      // so items can be moved to the items parent list
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == location || selectedLocation == '' ? false : true
        }
      >
        <View>
          <Text
            style={
              this.state.selected ? styles.selectedItem : styles.unselectedItem
            }
          >
            {`${item.badge} - ${item.firstName}  ${
              item.lastName
            } - ${Math.floor(this.state.time / MS_IN_MINUTE)}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// props validation
GroupItem.propTypes = {
  locationUpdateTime: PropTypes.number,
  item: PropTypes.object, // the current person
  location: PropTypes.string, // the parent groupName
  toggleSelectedPersonById: PropTypes.func,
  selectedLocation: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps;
  return {
    selectedLocation: getSelectedLocation(state),
    locationUpdateTime: getLocationUpdateTimeByPerson(state, item),
  };
};

export default connect(mapStateToProps, { toggleSelectedPersonById })(
  GroupItem
);

const styles = StyleSheet.create({
  selectedItem: {
    color: colors.text.secondaryLight,
  },
  unselectedItem: {
    color: colors.text.primaryLight,
  },
});
