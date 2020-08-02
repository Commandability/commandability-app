/**
 * EndScreen component
 *
 * Manages displaying the end screen after an incident.
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Text,
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
        <Text style={styles.label}>Incident Location</Text>
        <TextInput
          style={styles.locationInput}
          autoCapitalize="none"
          onChangeText={location => this.setState({ location })}
          value={this.state.location}
        />
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          autoCapitalize="none"
          multiline={true}
          onChangeText={notes => this.setState({ notes })}
          value={this.state.notes}
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._resumeIncident}
          >
            <Text style={styles.opacityText}>Resume Incident</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._saveAndExit}
          >
            <Text style={styles.opacityText}>Save and Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._exitWithoutSaving}
          >
            <Text style={styles.opacityText}>Exit without saving</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.primary.dark}
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
