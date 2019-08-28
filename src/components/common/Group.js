/**
 * Group Component
 *
 * props:
 *  - groupName: the current group's data location
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import COLORS from "../../modules/Colors";
import { scaleFont } from "../../modules/Fonts";
import GroupList from "./GroupList";

export default class Group extends Component {
  render() {
    return (
      <View style={styles.groupLayout}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupHeaderContent}> Group Title </Text>
          <TouchableOpacity style={{ flex: 1 }}>
            <Image
              style={styles.settingsIcon}
              source={require("../../../assets/settings_icon.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <GroupList groupName={this.props.groupName} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  groupLayout: {
    flex: 1,
    flexDirection: "column",
    padding: 4
  },
  groupHeader: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    backgroundColor: COLORS.secondary.dark
  },
  groupHeaderContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: "center",
    color: COLORS.primary.text
  },
  groupList: {
    flex: 7,
    backgroundColor: COLORS.primary.dark
  },
  settingsIcon: {
    flex: 1,
    padding: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  }
});
