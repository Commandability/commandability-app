/**
 * HomeScreen component
 *
 * Manages displaying the home screen and activity indicator when signing out.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';

import {
  activeReport,
  completedReport,
  configurationLoaded,
} from '../../redux/selectors';
import {
  signOut,
  toIncidentStack,
  toEndStack,
  resetApp,
} from '../../redux/actions';
import { updateUserData } from '../../modules/config-manager';
import { uploadReports, deleteAllReports } from '../../modules/report-manager';
import colors from '../../modules/colors';
import styles from './styles';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  componentDidMount() {
    this.setState({ loading: false });
    const {
      activeReport,
      completedReport,
      toIncidentStack,
      toEndStack,
    } = this.props;
    if (activeReport) {
      toIncidentStack();
    }
    if (completedReport) {
      toEndStack();
    }
  }

  _startIncident = () => {
    const { configurationLoaded, toIncidentStack } = this.props;

    if (configurationLoaded) {
      toIncidentStack();
    } else {
      Alert.alert(
        'No configuration data found.',
        "Load your organization's configuration data from the web portal to begin recording incidents.",
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  _updateConfiguration = async () => {
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      this.setState({
        loading: true,
      });
      try {
        await updateUserData();
        Alert.alert(
          'Configuration updated.',
          "The latest configuration data has been loaded from your organization's account.",
          [
            {
              text: 'OK',
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
      this.setState({
        loading: false,
      });
    } else {
      Alert.alert(
        'Failed to connect to the network. ',
        'Please check your network connection status. ',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  _uploadReports = async () => {
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      this.setState({
        loading: true,
      });
      try {
        await uploadReports();
        await deleteAllReports();
        Alert.alert(
          'All reports uploaded. ',
          'All reports were successfully uploaded and removed from local storage.',
          [
            {
              text: 'OK',
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
      this.setState({
        loading: false,
      });
    } else {
      Alert.alert(
        'Failed to connect to the network. ',
        'Please check your network connection status. ',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  _signOut = async () => {
    Alert.alert(
      'Are you sure you want to sign out?',
      'All personnel and incident data will be removed, but any reports will still be available on next sign in.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: async () => {
            this.setState({
              loading: true,
            });
            const { resetApp } = this.props;
            resetApp();
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Error', error, [
                {
                  text: 'OK',
                },
              ]);
            }
          },
        },
      ]
    );
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.opacity}
          onPress={this._startIncident}
          color={colors.primary.light}
        >
          <Icon name="launch" style={styles.icon} />
          <Text style={styles.opacityText}>Start Incident</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._updateConfiguration}
            color={colors.primary.light}
          >
            <Icon name="update" style={styles.icon} />
            <Text style={styles.opacityText}>Update Configuration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._uploadReports}
            color={colors.primary.light}
          >
            <Icon name="upload" style={styles.icon} />
            <Text style={styles.opacityText}>Upload Reports</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._setTheme}
            color={colors.primary.light}
          >
            <Icon name="theme-light-dark" style={styles.icon} />
            <Text style={styles.opacityText}>Light Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._signOut}
            color={colors.primary.light}
          >
            <Icon name="logout" style={styles.icon} />
            <Text style={styles.opacityText}>Sign out</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.primary.light}
            size={'large'}
          />
        )}
      </View>
    );
  }
}

// props validation
HomeScreen.propTypes = {
  activeReport: PropTypes.bool,
  completedReport: PropTypes.bool,
  configurationLoaded: PropTypes.bool,
  reportData: PropTypes.object,
  email: PropTypes.string,
  signOut: PropTypes.func,
  toIncidentStack: PropTypes.func,
  toEndStack: PropTypes.func,
  resetApp: PropTypes.func,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
  completedReport: completedReport(state),
  configurationLoaded: configurationLoaded(state),
});

export default connect(
  mapStateToProps,
  {
    signOut,
    toIncidentStack,
    toEndStack,
    resetApp,
  }
)(HomeScreen);
