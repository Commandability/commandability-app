import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import StagingList from './StagingList';

export default class Staging extends Component {
  render() {
    return (
      <View style={styles.groupLayout}>
        <StagingList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupLayout: {
    flex: 1,
    flexDirection: 'column',
  },
});
