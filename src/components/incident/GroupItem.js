/**
 * GroupItem Component
 *
 * props:
 *  - groupName: the parent groupName
 *  - item: the current person
 *
 * Manages displaying a person in a group and sets a person as selected in redux and in local state on press.
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { getSelectedLocation, getLastLocationUpdateById } from '../../reducers';
import { toggleSelectedPersonById } from '../../actions';
import { scaleFont } from '../../modules/fonts';

const MS_IN_MINUTE = 60000;

class GroupItem extends Component {
  constructor(props) {
    super(props);
    const { lastLocationUpdate } = this.props;
    this.state = {
      selected: false,
      time: Date.now() - lastLocationUpdate,
    };
  }

  componentDidMount() {
    const { lastLocationUpdate } = this.props;
    // set first timer manually to reduce interval when remounting component after crash
    this.timeoutID = setTimeout(
      (outerTimer = () => {
        this.setState(prevState => ({
          time: Date.now() - lastLocationUpdate,
        }));
        // set recurring timers at constant intervals
        this.intervalID = setInterval(
          (innerTimer = () =>
            this.setState(prevState => ({
              time: Date.now() - lastLocationUpdate,
            }))),
          MS_IN_MINUTE
        );
      }),
      // calculate remaining ms in last count before a new interval should be started
      MS_IN_MINUTE - ((Date.now() - lastLocationUpdate) % MS_IN_MINUTE)
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
          selectedLocation == location || selectedLocation == null
            ? false
            : true
        }
      >
        <View>
          <Text
            style={this.state.selected ? { color: 'red' } : { color: 'black' }}
          >
            {`${item.badge} - ${item.firstName}  ${
              item.lastName
            } - ${Math.floor(this.state.time / 60000)}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps;
  return {
    selectedLocation: getSelectedLocation(state),
    lastLocationUpdate: getLastLocationUpdateById(state, item.id),
  };
};

export default connect(mapStateToProps, { toggleSelectedPersonById })(
  GroupItem
);

var styles = StyleSheet.create({
  itemContent: {
    fontSize: scaleFont(6),
    paddingLeft: 2,
  },
});
