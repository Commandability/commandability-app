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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';

import {
  activeReport,
  completedReport,
  configurationLoaded,
  getTheme,
} from '../../redux/selectors';
import {
  signOut,
  toIncidentStack,
  toEndStack,
  resetApp,
  setGroup,
  clearPersonnel,
  addPerson,
  toggleTheme,
} from '../../redux/actions';
import { uploadReports, deleteAllReports } from '../../modules/report-manager';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
  ROSTER,
} from '../../modules/location-ids.js';
import { DARK, LIGHT } from '../../modules/theme-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const { theme } = this.props;
    this.state = { loading: false, theme };
  }

  componentDidMount() {
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
        const { setGroup, clearPersonnel, addPerson } = this.props;

        const { currentUser } = auth();
        // User is signed in.
        if (currentUser) {
          const { uid } = currentUser;
          const documentSnapshot = await firestore()
            .collection('users')
            .doc(uid)
            .get();
          const { groups, personnel } = documentSnapshot.data();

          const groupIds = [
            GROUP_ONE,
            GROUP_TWO,
            GROUP_THREE,
            GROUP_FOUR,
            GROUP_FIVE,
            GROUP_SIX,
          ];
          // set default group settings
          groupIds.forEach(id => {
            const { name, visibility } = groups[id];
            setGroup(id, name, visibility);
          });
          // refresh personnel data
          clearPersonnel();
          personnel.forEach(person => {
            addPerson(person, false, ROSTER); // disable logging
          });
        }

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

  _toggleTheme = () => {
    this.setState(prevState =>
      prevState.theme === DARK ? { theme: LIGHT } : { theme: DARK }
    );
    const { toggleTheme } = this.props;
    toggleTheme();
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
    const colors = themeSelector(this.state.theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.opacity}
          onPress={this._startIncident}
          color={colors.primary}
        >
          <Icon name="launch" style={styles.icon} />
          <Text style={styles.opacityText}>Start Incident</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._updateConfiguration}
            color={colors.primary}
          >
            <Icon name="update" style={styles.icon} />
            <Text style={styles.opacityText}>Update Configuration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._uploadReports}
            color={colors.primary}
          >
            <Icon name="upload" style={styles.icon} />
            <Text style={styles.opacityText}>Upload Reports</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._toggleTheme}
            color={colors.primary}
          >
            <Icon name="theme-light-dark" style={styles.icon} />
            <Text style={styles.opacityText}>{this.state.theme === DARK ? 'Light' : 'Dark'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._signOut}
            color={colors.primary}
          >
            <Icon name="logout" style={styles.icon} />
            <Text style={styles.opacityText}>Sign out</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.primary}
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
  setGroup: PropTypes.func,
  clearPersonnel: PropTypes.func,
  addPerson: PropTypes.func,
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
  completedReport: completedReport(state),
  configurationLoaded: configurationLoaded(state),
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    signOut,
    toIncidentStack,
    toEndStack,
    resetApp,
    setGroup,
    clearPersonnel,
    addPerson,
    toggleTheme,
  }
)(HomeScreen);
