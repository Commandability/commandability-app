import React, { Component } from "react";
import {
  AppRegistry,
  TouchableOpacity,
  Flatlist,
  Text,
  View,
  Image,
  Alert,
  StyleSheet
} from "react-native";
import { NavBar, Group, Staging, Roster } from "../components/incident";
import * as locations from "../modules/locations";
import COLORS from "../modules/Colors";

export default class IncidentScreen extends Component {
  render() {
    return (
      <View style={styles.incidentScreenLayout}>
        <NavBar />
        <View style={styles.pageLayout}>
          <View style={styles.stagingArea}>
            <Staging groupName={locations.STAGING} />
            <Roster groupName={locations.ROSTER} />
          </View>
          <View style={styles.groupArea}>
            <View style={styles.subGroupArea}>
              <Group groupName={locations.GROUP_ONE} />
              <Group groupName={locations.GROUP_TWO} />
            </View>
            <View style={styles.subGroupArea}>
              <Group groupName={locations.GROUP_THREE} />
              <Group groupName={locations.GROUP_FOUR} />
            </View>
            <View style={styles.subGroupArea}>
              <Group groupName={locations.GROUP_FIVE} />
              <Group groupName={locations.REHAB} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  incidentScreenLayout: {
    flexDirection: "column",
    flex: 2
  },
  pageLayout: {
    flexDirection: "row",
    flex: 10
  },
  stagingArea: {
    flexDirection: "column",
    flex: 1
  },
  personnelList: {
    flex: 1
  },
  groupArea: {
    flexDirection: "row",
    flex: 3,
    padding: 5,
    backgroundColor: COLORS.primary.dark
  },
  subGroupArea: {
    flexDirection: "column",
    flex: 1
  }
});

