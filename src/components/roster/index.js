/**
 * Roster Component
 *
 * Manages displaying the roster and search bar.
 */

import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

import colors from '../../modules/colors';
import RosterList from '../roster-list';
import styles from './styles';

export default class Roster extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  render() {
    return (
      <View style={styles.groupLayout}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupHeaderContent}> Roster </Text>
        </View>
        <TextInput
          style={styles.queryInput}
          autoCapitalize="none"
          placeholder="Search"
          placeholderTextColor={colors.primary.light}
          onChangeText={query => this.setState({ query })}
          value={this.state.query}
        />
        <RosterList query={this.state.query} />
      </View>
    );
  }
}
