import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default class NewPersonnel extends Component {
  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.firstName}>
          
        </View>
        <View style={styles.lastName}>

        </View>
        <View style={styles.badge}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
  },
  firstName: {
    flex: 1,
  },
  lastName: {
    flex: 1,
  },
  badge: {
    flex: 1,
  },
});
