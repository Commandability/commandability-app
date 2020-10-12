/**
 * Roster Component
 *
 * Manages displaying the roster and search bar.
 */

import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RosterList from '../roster-list';
import {
  getSelectedLocationId,
  getSelectedPersonnel,
  getTheme,
} from '../../redux/selectors';
import {
  clearSelectedPersonnel,
  setPersonLocationId,
  removePerson,
} from '../../redux/actions';
import { STAGING, ROSTER } from '../../modules/location-ids';
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
    const { selectedLocationId, theme } = this.props;

    const renderOverlay =
      selectedLocationId && selectedLocationId !== ROSTER ? true : false;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        {renderOverlay && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={this._onRosterPressed}
          />
        )}
        <View style={styles.header}>
          <Text style={styles.headerContent}> Roster </Text>
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
  selectedLocationId: PropTypes.string,
  locationId: PropTypes.string,
  selectedPersonnel: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  removePerson: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  selectedLocationId: getSelectedLocationId(state),
  selectedPersonnel: getSelectedPersonnel(state),
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    removePerson,
    setPersonLocationId,
  }
)(Roster);
