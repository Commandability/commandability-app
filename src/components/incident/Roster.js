import React, { Component } from "react";
import {
  AppRegistry,
  TouchableOpacity,
  Flatlist,
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform
} from "react-native";
import colors from "../../modules/colors";
import { scaleFont } from "../../modules/fonts";
import GroupList from "./GroupList";
import RosterList from "./RosterList";

export default class Roster extends Component {
  render() {
    return (
      <View style={styles.groupLayout}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupHeaderContent}> Roster </Text>
        </View>
        <RosterList/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  groupLayout: {
    flex: 1,
    flexDirection: "column"
  },
  groupHeader: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    backgroundColor: colors.secondary.dark
  },
  groupHeaderContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: "center",
    color: colors.primary.text
  },
  groupList: {
    flex: 7,
    backgroundColor: colors.primary.dark
  }
});
