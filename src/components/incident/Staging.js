import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import colors from "../../modules/colors";
import { scaleFont } from "../../modules/fonts";
import StagingList from "./StagingList";

export default class Staging extends Component {
  render() {
    return (
      <View style={styles.groupLayout}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupHeaderContent}> Staging </Text>
        </View>
        <StagingList/>
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
});
