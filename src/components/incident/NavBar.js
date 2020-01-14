import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scaleFont } from '../../modules/fonts';
import { getCurrentReportData } from '../../reducers/ReportReducer';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import colors from '../../modules/colors';
import { resetIncident, endIncident } from '../../actions';
import { getInitialTime } from '../../reducers';
import { saveCurrentReport } from '../../modules/reportManager';

const MS_IN_SECOND = 1000;

import { generateCurrentReport } from '../../modules/reportManager';

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

  _onResetPressed = () => {
    const { resetIncident } = this.props;
    resetIncident();
  };

  _onEndPressed = () => {
    const { endIncident, resetIncident } = this.props;
    endIncident();
    saveCurrentReport();
    resetIncident();
    this.props.navigation.navigate('HomeScreen');
  };

  componentDidMount() {
    var currentTime = new Date();
    this.intervalID = setInterval(
      () =>
        this.setState(() => ({
          time: Date.now(),
          hour: currentTime.getHours(),
          minute: currentTime.getMinutes(),
          second: currentTime.getSeconds(),
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
            <Text
              style={styles.timerContent}
            >{`Time: ${this.state.hour}:${this.state.minute}:${this.state.second}`}</Text>
          </View>
          <View style={styles.timer}>
            <Text style={styles.timerContent}>{`Elapsed: ${Math.floor(
              (this.state.time - initialTime) / 3600000
            )}:${Math.floor(
              ((this.state.time - initialTime) % 3600000) / 60000
            )}:${Math.floor(
              (((this.state.time - initialTime) % 3600000) % 60000) / 1000
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
  resetIncident: PropTypes.func,
  endIncident: PropTypes.func,
  navigation: PropTypes.object,
  initialTime: PropTypes.number,
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

var styles = StyleSheet.create({
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
