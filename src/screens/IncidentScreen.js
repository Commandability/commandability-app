/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NavBar, Group, Staging, Roster } from '../components/incident';
import colors from '../modules/colors';
import { activeReport } from '../reducers';
import { startIncident } from '../actions';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
} from '../modules/locationIds';

class IncidentScreen extends Component {
  componentDidMount() {
    const { startIncident, activeReport } = this.props;
    // prevent start incident from wiping report when IncidentScreen is re-mounted after a crash
    if (!activeReport) {
      startIncident();
    }
  }

  render() {
    return (
      <View style={styles.incidentLayout}>
        <NavBar />
        <View style={styles.pageLayout}>
          <View style={styles.stagingArea}>
            <Staging />
            <Roster />
          </View>
          <View style={styles.groupArea}>
            <View style={styles.subGroupArea}>
              <Group locationId={GROUP_ONE} />
              <Group locationId={GROUP_TWO} />
            </View>
            <View style={styles.subGroupArea}>
              <Group locationId={GROUP_THREE} />
              <Group locationId={GROUP_FOUR} />
            </View>
            <View style={styles.subGroupArea}>
              <Group locationId={GROUP_FIVE} />
              <Group locationId={GROUP_SIX} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

IncidentScreen.propTypes = {
  activeReport: PropTypes.bool,
  startIncident: PropTypes.func,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
});

export default connect(mapStateToProps, {
  startIncident,
})(IncidentScreen);

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
  groupArea: {
    flexDirection: 'row',
    flex: 3,
    padding: 5,
    backgroundColor: colors.primary.dark,
  },
  subGroupArea: {
    flexDirection: 'column',
    flex: 1,
  },
});
