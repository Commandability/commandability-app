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
import { resetIncident, endIncident } from '../../actions';
import { getInitialTime } from '../../reducers';
import { saveCurrentReport, generateCurrentReport } from '../../modules/reportManager';

const MS_IN_SECOND = 1000;

function digitFix(num) {
  if (num.toString().length == 1) {
    num = '0' + num;
  }
  return num;
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      hour: '',
      minute: '',
      second: '',
    };
  }

  componentWillUnmount() {
    // clear timers to prevent memory leaks
    clearInterval(this.intervalID);
  }

  _onReportPressed = () => {
    Alert.alert(
      'Report Page',
      generateCurrentReport(),
      [{ text: 'Cancel' }, { text: 'OK' }],
      { cancelable: false }
    );
  };

  _onAddPressed = () => {
    this.props.navigation.navigate('RosterPrompt');
  };

  _onEndPressed = () => {
    const { endIncident, resetIncident } = this.props;
    endIncident(); // log incident end
    saveCurrentReport();
    resetIncident(); // reset personnel locations and group settings, remove all unlogged personnel from state
    this.props.navigation.navigate('HomeScreen');
  };

  componentDidMount() {
    this.intervalID = setInterval(
      () =>
        this.setState(() => ({
          time: Date.now(),
          currentTimes: new Date().toLocaleString(),
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
          second: new Date().getSeconds(),
        })),
      MS_IN_SECOND
    );
  }

  render() {
    const { initialTime } = this.props;
    return (
      <View style={styles.navBar}>
        <View style={styles.timerLayout}>
          <View style={styles.timer}>
            <Text style={styles.timerContent}>{`Elapsed: ${digitFix(
              Math.floor((this.state.time - initialTime) / 3600000)
            )}:${digitFix(
              Math.floor(((this.state.time - initialTime) % 3600000) / 60000)
            )}:${digitFix(
              Math.floor(
                (((this.state.time - initialTime) % 3600000) % 60000) / 1000
              )
            )}`}</Text>
          </View>
        </View>
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
            onPress={this._onAddPressed}
          >
            <Text style={styles.pageOptionContent}> Add Personnel </Text>
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
  resetIncident: PropTypes.func,
  endIncident: PropTypes.func,
  navigation: PropTypes.object,
  initialTime: PropTypes.number,
  report: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    initialTime: getInitialTime(state),
    report: getCurrentReportData(state),
  };
};

export default withNavigation(
  connect(mapStateToProps, {
    endIncident,
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
  timerLayout: {
    flexDirection: 'column',
    flex: 1,
  },
  timer: {
    flex: 1,
    justifyContent: 'center',
  },
  timerContent: {
    fontSize: scaleFont(5),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.primary.text,
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
