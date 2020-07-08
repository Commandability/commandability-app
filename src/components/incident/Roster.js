import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';
import RosterList from './RosterList';

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

const styles = StyleSheet.create({
  queryInput: {
    height: 40,
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  groupLayout: {
    flex: 1,
    flexDirection: 'column',
  },
  groupHeader: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: colors.secondary.dark,
  },
  groupHeaderContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.primary.text,
  },
});
