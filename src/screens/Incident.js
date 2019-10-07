import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { NavBar, Group, Staging, Roster } from "../components/incident";
import * as locations from "../modules/locations";

export default class Incident extends Component {
  render() {
    return (
      <View style={styles.incidentLayout}>
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
  incidentLayout: {
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
    padding: 5
  },
  subGroupArea: {
    flexDirection: "column",
    flex: 1
  }
});

