/**
 * NavBar Component
 *
 * This component displays the Navigation bar at the top of the incident page.
 */

import React, { Component } from "react";
import {TouchableOpacity, Text, View, StyleSheet} from "react-native";
import COLORS from "../../modules/Colors";
import { scaleFont } from "../../modules/Fonts";

export default class NavBar extends Component {
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
          <Text style={styles.pageOptionContent}> Options </Text>
        </View>
      </View>
    );
  }
}

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
    justifyContent: "center"
  },
  pageOptionContent: {
    fontSize: scaleFont(5),
    textAlignVertical: "center",
    textAlign: "center",
    color: COLORS.primary.text
  }
});
