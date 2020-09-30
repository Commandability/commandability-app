/**
 * Staging Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StagingList from '../staging-list';
import {
  getGroupByLocationId,
  getPersonnelByLocationId,
  getSelectedLocationId,
  getSelectedPersonnel,
  getTheme,
} from '../../redux/selectors';
import {
  setVisibility,
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import { STAGING } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class Staging extends Component {
  _onStagingPressed = () => {
    const {
      selectedPersonnel,
      clearSelectedPersonnel,
      setPersonLocationId,
      selectedGroup,
    } = this.props;

    // set each selected id's new locationId to STAGING
    selectedPersonnel.forEach(person => {
      setPersonLocationId(
        person,
        // To report prev location
        selectedGroup,
        { locationId: STAGING, name: 'Staging' }
      );
    });
    clearSelectedPersonnel();
  };

  render() {
    const { selectedLocationId, theme } = this.props;

    const renderOverlay =
      selectedLocationId && selectedLocationId !== STAGING ? true : false;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        {renderOverlay && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={this._onStagingPressed}
          />
        )}
        <View style={styles.header}>
          <Text style={styles.headerContent}> Staging </Text>
        </View>
        <StagingList />
      </View>
    );
  }
}

// props validation
Staging.propTypes = {
  personnel: PropTypes.array,
  selectedLocationId: PropTypes.string,
  locationId: PropTypes.string,
  selectedPersonnel: PropTypes.array,
  selectedGroup: PropTypes.object,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = state => {
  const personnel = getPersonnelByLocationId(state, STAGING);
  const selectedLocationId = getSelectedLocationId(state);

  return {
    personnel,
    selectedLocationId,
    selectedGroup: getGroupByLocationId(state, selectedLocationId),
    selectedPersonnel: getSelectedPersonnel(state),
    theme: getTheme(state),
  };
};

export default connect(
  mapStateToProps,
  {
    setVisibility,
    clearSelectedPersonnel,
    setPersonLocationId,
  }
)(Staging);
