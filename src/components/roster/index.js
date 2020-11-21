/**
 * Roster Component
 *
 * Manages displaying the roster and search bar.
 */

import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RosterList from '../roster-list';
import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class Roster extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  render() {
    const { theme } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerContent}> ROSTER </Text>
        </View>
        <TextInput
          style={styles.queryInput}
          autoCapitalize="none"
          placeholder="Search"
          placeholderTextColor={colors.text.main}
          onChangeText={query => this.setState({ query })}
          value={this.state.query}
        />
        <RosterList query={this.state.query} />
      </View>
    );
  }
}

// props validation
Roster.propTypes = {
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  null
)(Roster);
