/**
 * HomeScreen component
 *
 * Manages displaying the home screen and activity indicator when signing out.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';

import {
  activeReport,
  completedReport,
  configurationLoaded,
} from '../../redux/selectors';
import { resetApp } from '../../redux/actions';
import { updateUserData } from '../../modules/config-manager';
import { uploadReports, deleteAllReports } from '../../modules/report-manager';
import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';
import styles from './styles';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = { currentUser: null, loading: false };
  }

  componentDidMount() {
    const { currentUser } = auth();
    this.setState({ currentUser, loading: false });
    this.props.navigation.setParams({ userEmail: auth().currentUser.email });

    const { activeReport, completedReport } = this.props;
    if (activeReport) {
      this.props.navigation.navigate('IncidentStack');
    }
    if (completedReport) {
      this.props.navigation.navigate('EndStack');
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('userEmail'),
      headerTitleStyle: {
        color: 'white',
        textAlign: 'right',
        fontSize: scaleFont(6),
      },
    };
  };

  _startIncident = () => {
    const { configurationLoaded } = this.props;

    if (configurationLoaded) {
      this.props.navigation.navigate('IncidentScreen');
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
      this.setState(prevState => ({
        currentUser: prevState.currentUser,
        loading: true,
      }));
      try {
        await updateUserData();
        Alert.alert(
          'Configuration updated.',
          'The latest personnel and incident configuration data has been loaded from your organization\'s account.',
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
      this.setState(prevState => ({
        currentUser: prevState.currentUser,
        loading: false,
      }));
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
      this.setState(prevState => ({
        currentUser: prevState.currentUser,
        loading: true,
      }));
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
      this.setState(prevState => ({
        currentUser: prevState.currentUser,
        loading: false,
      }));
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
            this.setState(prevState => ({
              currentUser: prevState.currentUser,
              loading: true,
            }));
            const { resetApp } = this.props;
            resetApp();
            try {
              await auth().signOut();
              this.props.navigation.navigate('AuthStack');
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
    this.setState(prevState => ({
      currentUser: prevState.currentUser,
      loading: false,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.opacity}
          onPress={this._startIncident}
          color={colors.primary.light}
          title={'Start Incident'}
        >
          <Icon name="launch" style={styles.icon} />
          <Text style={styles.iconText}>Start Incident</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._updateConfiguration}
            title="Update Configuration"
            color={colors.primary.light}
          >
            <Icon name="update" style={styles.icon} />
            <Text style={styles.iconText}>Update Configuration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._uploadReports}
            title="Upload Reports"
            color={colors.primary.light}
          >
            <Icon name="upload" style={styles.icon} />
            <Text style={styles.iconText}>Upload Reports</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.opacity}
          onPress={this._signOut}
          title="Sign out"
          color={colors.primary.light}
        >
          <Icon name="logout" style={styles.icon} />
          <Text style={styles.iconText}>Log out</Text>
        </TouchableOpacity>
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
  navigation: PropTypes.object,
  activeReport: PropTypes.bool,
  completedReport: PropTypes.bool,
  configurationLoaded: PropTypes.bool,
  navigate: PropTypes.func,
  reportData: PropTypes.object,
  email: PropTypes.string,
  resetApp: PropTypes.func,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
  completedReport: completedReport(state),
  configurationLoaded: configurationLoaded(state),
});

export default connect(
  mapStateToProps,
  { resetApp }
)(HomeScreen);
