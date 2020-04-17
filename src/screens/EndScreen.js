/**
 * EndScreen component
 *
 * Manages displaying the end screen after an incident.
 */

import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { resetIncident, endIncident, resumeIncident } from '../actions';
import { saveCurrentReport } from '../modules/reportManager';
import colors from '../modules/colors';

class EndScreen extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  componentDidMount() {
    const { endIncident } = this.props;
    endIncident(); // log incident end
  }

  _saveAndExit = async () => {
    const { resetIncident } = this.props;
    this.setState({ loading: true });
    try{
      await saveCurrentReport();
    }
    catch(error){
      Alert.alert('Error', error, [
        {
          text: 'OK',
        },
      ]);
    }
    this.setState({ loading: false });
    resetIncident(); // reset personnel locations and group settings, remove all un-logged personnel from state
    this.props.navigation.navigate('HomeScreen');
  }

  _resumeIncident = () => {
    const { resumeIncident } = this.props;
    resumeIncident();
    this.props.navigation.navigate('IncidentScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this._resumeIncident}
          title="Resume Incident"
          color={colors.primary.light}
        />
        <Button
          onPress={this._saveAndExit}
          title="Save and Exit"
          color={colors.primary.light}
        />
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.secondary.dark}
            size={'large'}
          />
        )}
      </View>
    );
  }
}

EndScreen.propTypes = {
  navigation: PropTypes.object,
  endIncident: PropTypes.func,
  resetIncident: PropTypes.func,
  resumeIncident: PropTypes.func
};

export default withNavigation(
  connect(null, {
    endIncident,
    resetIncident,
    resumeIncident
  })(EndScreen)
);

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
});
