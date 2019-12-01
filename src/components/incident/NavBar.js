import React, { Component } from "react";
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform
} from "react-native";
import COLORS from "../../modules/Colors";
import { scaleFont } from "../../modules/Fonts";
import { getReport } from "../../reducers/ReportReducer";

import { connect } from "react-redux";
import { resetIncident, endIncident } from "../../actions";

class NavBar extends Component {

  _onReportPressed = () => {
    const { report } = this.props;
    let convertedReport = '';
    for (const entry in report){
      const {time, log} = report[entry];
      if (time && log) {
        convertedReport += `${time}: ${log}\n`;
      }
    }

    Alert.alert(
      'Report Page',
      convertedReport.trim(),
      [
        {text: 'Cancel'},
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  };

  _onResetPressed = () => {
    const { resetIncident } = this.props;
    resetIncident();
  };

  _onEndPressed = () => {
    const { endIncident } = this.props;
    endIncident();
  };

  render() {
    return (
      <View style={styles.navBar}>
        <View style={styles.timerLayout}>
          <View style={styles.timer}>
            <Text style={styles.timerContent}>Time:</Text>
          </View>
          <View style={styles.timer}>
            <Text style={styles.timerContent}>Elapsed:</Text>
          </View>
        </View>
        <View style={styles.pageTabs}></View>
        <View style={styles.pageOptions}>
          <TouchableOpacity style={{flex:1}} onPress={this._onReportPressed}>
            <Text style={styles.pageOptionContent}> Report </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageOptions}>
          <TouchableOpacity style={{flex:1}} onPress={this._onResetPressed}>
            <Text style={styles.pageOptionContent}> Reset </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageOptions}>
          <TouchableOpacity style={{flex:1}} onPress={this._onEndPressed}>
            <Text style={styles.pageOptionContent}> End </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    report: getReport(state),
  };
};

export default connect(
  mapStateToProps,
  {
    endIncident,
    resetIncident
  }
)(NavBar);

var styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: COLORS.primary.dark,
    borderWidth: 0.5
  },
  timerLayout: {
    flexDirection: "column",
    flex: 1
  },
  timer: {
    flex: 1,
    justifyContent: "center"
  },
  timerContent: {
    fontSize: scaleFont(5),
    textAlignVertical: "center",
    textAlign: "center",
    color: COLORS.primary.text
  },
  pageTabs: {
    flexDirection: "row",
    flex: 6
  },
  pageOptions: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1
  },
  pageOptionContent: {
    fontSize: scaleFont(5),
    textAlignVertical: "center",
    textAlign: "center",
    color: COLORS.primary.text
  }
});
