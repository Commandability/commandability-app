/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Group, Roster, NewPersonnel } from '../incident';
import colors from '../../modules/colors';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
} from '../../modules/locationIds';

class GroupArea extends Component {
  render() {
    //const { toggle } = this.props;
    const toggle = true;
    if (toggle) {
      return (
        <View style={styles.groupArea}>
          <View style={styles.subGroupArea}>
            <Group locationId={GROUP_ONE} />
            <Group locationId={GROUP_TWO} />
          </View>
          <View style={styles.subGroupArea}>
            <Group locationId={GROUP_THREE} />
            <Group locationId={GROUP_FOUR} />
          </View>
          <View style={styles.subGroupArea}>
            <Group locationId={GROUP_FIVE} />
            <Group locationId={GROUP_SIX} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Roster />
          </View>
          <View style={styles.subContainer}>
            <NewPersonnel />
          </View>
        </View>
      );
    }
  }
}

// props validation
GroupArea.propTypes = {
  toggle: PropTypes.bool,
};

export default GroupArea;

const styles = StyleSheet.create({
  groupArea: {
    flexDirection: 'row',
    flex: 3,
    padding: 5,
    backgroundColor: colors.primary.dark,
  },
  subGroupArea: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 3,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
  },
});
