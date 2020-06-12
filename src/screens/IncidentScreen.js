/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

import { NavBar, Staging } from '../components/incident';
import { activeReport } from '../reducers';
import { startIncident } from '../actions';
import { scaleFont } from '../modules/fonts';
import GroupArea from '../components/incident/GroupArea';

class IncidentScreen extends Component {
  componentDidMount() {
    const { startIncident, activeReport } = this.props;
    this.props.navigation.setParams({userEmail: auth().currentUser.email});
    // prevent start incident from wiping report when IncidentScreen is re-mounted after a crash
    if (!activeReport) {
      startIncident();
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('userEmail'),
      headerTitleStyle: {
        color: 'white',
        textAlign: 'right',
        fontSize: scaleFont(6),
      },
    };
  }

  render() {
    return (
      <View style={styles.incidentLayout}>
        <NavBar />
        <View style={styles.pageLayout}>
          <View style={styles.stagingArea}>
            <Staging />
          </View>
          <GroupArea />
        </View>
      </View>
    );
  }
}

IncidentScreen.propTypes = {
  activeReport: PropTypes.bool,
  startIncident: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
});

export default connect(mapStateToProps, {startIncident})(IncidentScreen);

const styles = StyleSheet.create({
  incidentLayout: {
    flexDirection: 'column',
    flex: 2,
  },
  pageLayout: {
    flexDirection: 'row',
    flex: 10,
  },
  stagingArea: {
    flexDirection: 'column',
    flex: 1,
  },
});
