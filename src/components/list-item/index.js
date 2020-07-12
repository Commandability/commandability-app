/**
 * ListItem Component
 *
 * Manages displaying a person in a group and sets a person as selected in redux and in local state on press.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import {
  getSelectedLocationId,
  getPersonGroupUpdateTime,
  personIsSelected,
} from '../../redux/selectors';
import { toggleSelectedPersonById } from '../../redux/actions';
import styles from './styles';

const MS_IN_MINUTE = 60000;

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this); // use bind to avoid duplicating methods on demanding components

    const { groupUpdateEpochTime } = this.props;
    this.state = {
      time: Date.now() - groupUpdateEpochTime,
    };
  }

  componentDidMount() {
    const { groupUpdateEpochTime } = this.props;
    // set first timer manually to reduce interval when remounting component after crash
    this.timeoutID = setTimeout(
      () => {
        this.setState(() => ({
          time: Date.now() - groupUpdateEpochTime,
        }));
        // set recurring timers at constant intervals
        this.intervalID = setInterval(
          () =>
            this.setState(() => ({
              time: Date.now() - groupUpdateEpochTime,
            })),
          MS_IN_MINUTE
        );
      },
      // calculate remaining ms in last count before a new interval should be started
      MS_IN_MINUTE - ((Date.now() - groupUpdateEpochTime) % MS_IN_MINUTE)
    );
  }

  componentWillUnmount() {
    // clear timers to prevent memory leaks
    clearInterval(this.timeoutID);
    clearInterval(this.intervalID);
  }

  _onPress() {
    const { item, locationId, toggleSelectedPersonById } = this.props;
    toggleSelectedPersonById(item.id, locationId);
  }

  render() {
    const {
      item: { badge, firstName, lastName },
      locationId,
      selectedGroup,
      personIsSelected,
    } = this.props;
    return (
      // disable item if a list other than the parent list is selected,
      // so items can be moved to the items parent list
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedGroup === locationId || selectedGroup === '' ? false : true
        }
      >
        <View>
          <Text
            style={
              personIsSelected ? styles.selectedItem : styles.unselectedItem
            }
          >
            {`${
              badge ? badge + ' - ' : ''
            }${firstName} ${lastName} - ${Math.floor(
              this.state.time / MS_IN_MINUTE
            )}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// props validation
ListItem.propTypes = {
  groupUpdateEpochTime: PropTypes.number,
  item: PropTypes.object, // the current person
  locationId: PropTypes.string, // the parent groupName
  toggleSelectedPersonById: PropTypes.func,
  selectedGroup: PropTypes.string,
  personIsSelected: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps;
  return {
    selectedGroup: getSelectedLocationId(state),
    groupUpdateEpochTime: getPersonGroupUpdateTime(state, item),
    personIsSelected: personIsSelected(state, item),
  };
};

export default connect(
  mapStateToProps,
  { toggleSelectedPersonById }
)(ListItem);