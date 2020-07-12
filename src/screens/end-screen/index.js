/**
 * EndScreen component
 *
 * Manages displaying the end screen after an incident.
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  resetIncident,
  endIncident,
  resumeIncident,
  logIncidentData,
} from '../../redux/actions';
import { saveCurrentReport } from '../../modules/report-manager';
import colors from '../../modules/colors';
import styles from './styles';

class EndScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      location: '',
      notes: '',
    };
  }

  componentDidMount() {
    const { endIncident } = this.props;
    endIncident(); // log incident end
  }

  _saveAndExit = async () => {
    if (this.state.location) {
      const { resetIncident, logIncidentData } = this.props;
      logIncidentData('LOCATION', this.state.location);
      if (this.state.notes) {
        logIncidentData('NOTES', this.state.notes);
      }
      this.setState({ loading: true });
      try {
        await saveCurrentReport();
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
      this.setState({ loading: false });
      resetIncident(); // reset personnel locations and group settings, remove all un-logged personnel from state
      this.props.navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Error:', 'Location is required.', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  _exitWithoutSaving = () => {
    this.props.navigation.navigate('ExitIncidentPrompt');
  };

  _resumeIncident = () => {
    const { resumeIncident } = this.props;
    resumeIncident();
    this.props.navigation.navigate('IncidentScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this._resumeIncident}
          title="Resume Incident"
          color={colors.primary.light}
        />
        <TextInput
          style={styles.locationInput}
          autoCapitalize="none"
          placeholder="Incident Location"
          placeholderTextColor={colors.primary.light}
          onChangeText={location => this.setState({ location })}
          value={this.state.location}
        />
        <TextInput
          style={styles.notesInput}
          autoCapitalize="none"
          placeholder="Notes"
          placeholderTextColor={colors.primary.light}
          multiline={true}
          onChangeText={notes => this.setState({ notes })}
          value={this.state.notes}
        />
        <Button
          onPress={this._saveAndExit}
          title="Save and Exit"
          color={colors.primary.light}
        />
        <Button
          onPress={this._exitWithoutSaving}
          title="Exit without saving"
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
  resumeIncident: PropTypes.func,
  logIncidentData: PropTypes.func,
};

export default withNavigation(
  connect(
    null,
    {
      endIncident,
      resetIncident,
      resumeIncident,
      logIncidentData,
    }
  )(EndScreen)
);
