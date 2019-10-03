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
import COLORS from "../modules/Colors";

export default class IncidentScreen extends Component {
  static navigationOptions = {
    title: 'Incident Mode',
    headerLeft: null,
  }
  render() {
    return (
      <View style={styles.incidentScreenLayout}>
        <NavBar />
        <View style={styles.pageLayout}>
          <View style={styles.stagingArea}>
            <Staging/>
            <Roster/>
          </View>
          <View style={styles.groupArea}>
            <View style={styles.subGroupArea}>
              <Group location={"group_one"} />
              <Group location={"group_two"} />
            </View>
            <View style={styles.subGroupArea}>
              <Group location={"group_three"} />
              <Group location={"group_four"} />
            </View>
            <View style={styles.subGroupArea}>
              <Group location={"group_five"} />
              <Group location={"group_six"} />
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

