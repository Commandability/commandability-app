/**
 * Roster Component
 *
 * This component displays the roster list.
 */

import React, { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet} from "react-native";
import COLORS from "../../modules/Colors";
import { scaleFont } from "../../modules/Fonts";
import GroupList from "./GroupList";
import RosterList from "./RosterList";

export default class Roster extends Component {
  render() {
    return (
      <View style={styles.groupLayout}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupHeaderContent}> Roster </Text>
        </View>
        <RosterList groupName={this.props.groupName} />
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
  }
});
