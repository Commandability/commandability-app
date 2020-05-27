/**
 * RosterPrompt Component
 *
 * Allows a user to add new personel to the incident
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { Roster, NewPersonnel } from '../components/incident';

class RosterPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: 'Manage Personnel',
    headerLeft: null,
  };

  render() {
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

// props validation
RosterPrompt.propTypes = {
  navigation: PropTypes.object,
  
};

export default RosterPrompt;

const styles = StyleSheet.create({
  container: {
      flex: 3,
      flexDirection: "row",
  },
  subContainer: {
    flex: 1,
  }
});
