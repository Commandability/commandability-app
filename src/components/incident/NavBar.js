/**
 * NavBar Component
 *
 * This component handles the NavBar above the incidentScreen
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { scaleFont } from '../../modules/fonts';
import { getCurrentReportData } from '../../reducers';
import colors from '../../modules/colors';
import { resetIncident } from '../../actions';
import Timer from './Timer';
import {
  generateCurrentReport,
  backupReports,
} from '../../modules/reportManager';

class NavBar extends Component {
  _onReportPressed = () => {
    Alert.alert(
      'Report Page',
      generateCurrentReport(),
      [{ text: 'Cancel' }, { text: 'OK' }],
      { cancelable: false }
    );
  };

  _onResetPressed = () => {
    const { resetIncident } = this.props;
    resetIncident();
  };

  _onEndPressed = () => {
    this.props.navigation.navigate('EndScreen');
  };

  _onUploadPressed = () => {
    backupReports();
  };

  render() {
    const { initialEpoch } = this.props;

    return (
      <View style={styles.navBar}>
        <Timer initialEpoch={initialEpoch} />
        <View style={styles.pageTabs}></View>
        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onReportPressed}
          >
            <Text style={styles.pageOptionContent}> Report </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onUploadPressed}
          >
            <Text style={styles.pageOptionContent}> Upload </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onResetPressed}
          >
            <Text style={styles.pageOptionContent}> Reset </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onEndPressed}
          >
            <Text style={styles.pageOptionContent}> End </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// props validation
NavBar.propTypes = {
  navigation: PropTypes.object,
  resetIncident: PropTypes.func,
  report: PropTypes.object,
  initialEpoch: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    report: getCurrentReportData(state),
  };
};

export default withNavigation(
  connect(mapStateToProps, {
    resetIncident,
  })(NavBar)
);

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.primary.dark,
    borderWidth: 0.5,
  },
  pageTabs: {
    flexDirection: 'row',
    flex: 6,
  },
  pageOptions: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
  },
  pageOptionContent: {
    fontSize: scaleFont(5),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.primary.text,
  },
  container: {
    flex: 1,
  },
});
