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
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { getCurrentReportData, getTheme } from '../../redux/selectors';
import {
  resetIncident,
  endIncident,
  resumeIncident,
  toHomeStack,
  toIncidentStack,
} from '../../redux/actions';
import { saveCurrentReport } from '../../modules/report-manager';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class _EndScreen extends Component {
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
      const { resetIncident, reportData } = this.props;
      reportData['LOCATION'] = this.state.location;
      if (this.state.notes) {
        reportData['NOTES'] = this.state.notes;
      }
      this.setState({ loading: true });
      try {
        const { reportData } = this.props;
        await saveCurrentReport(reportData);
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
      this.setState({ loading: false });
      resetIncident(); // reset personnel locations and group settings, remove all un-logged personnel from state
      const { toHomeStack } = this.props;
      toHomeStack();
    } else {
      Alert.alert('Error:', 'Location is required.', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  _exitWithoutSaving = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('ExitIncidentPrompt');
  };

  _resumeIncident = () => {
    const { resumeIncident, toIncidentStack } = this.props;
    resumeIncident();
    toIncidentStack();
  };

  render() {
    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Text style={styles.label}>Location *</Text>
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
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._resumeIncident}
          >
            <Icon name="restart" style={styles.icon} />
            <Text style={styles.opacityText}>Resume Incident</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.opacity, styles.rowOpacity]}
              onPress={this._exitWithoutSaving}
            >
              <Icon name="cancel" style={styles.icon} />
              <Text style={styles.opacityText}>Exit Without Saving</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.opacity, styles.rowOpacity]}
              onPress={this._saveAndExit}
            >
              <Icon name="check" style={styles.icon} />
              <Text style={styles.opacityText}>Save and Exit</Text>
            </TouchableOpacity>
          </View>
          {this.state.loading && (
            <ActivityIndicator
              style={styles.activityIndicator}
              color={colors.primary}
              size={'large'}
            />
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

_EndScreen.propTypes = {
  navigation: PropTypes.object,
  endIncident: PropTypes.func,
  resetIncident: PropTypes.func,
  resumeIncident: PropTypes.func,
  toHomeStack: PropTypes.func,
  toIncidentStack: PropTypes.func,
  reportData: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  reportData: getCurrentReportData(state),
  theme: getTheme(state),
});

const _ = connect(
  mapStateToProps,
  {
    endIncident,
    resetIncident,
    resumeIncident,
    toHomeStack,
    toIncidentStack,
  }
)(_EndScreen);

// Wrap and export
export default function EndScreen(props) {
  const navigation = useNavigation();

  return <_ {...props} navigation={navigation} />;
}
