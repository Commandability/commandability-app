import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { NavBar, Group, Staging, Roster } from "../components/incident";
import colors from "../modules/colors";
import { reportIsActive } from '../reducers';
import { startIncident } from "../actions";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { GROUP_ONE, GROUP_TWO, GROUP_THREE, GROUP_FOUR, GROUP_FIVE, GROUP_SIX } from "../modules/locations";

class IncidentScreen extends Component {

  componentDidMount(){
    const { startIncident, reportIsActive } = this.props;
    // prevent start incident from wiping report when IncidentScreen is re-mounted after a crash
    if (!reportIsActive){
      startIncident();
    }
  }

  render() {
    return (
      <View style={styles.incidentLayout}>
        <NavBar />
        <View style={styles.pageLayout}>
          <View style={styles.stagingArea}>
            <Staging/>
            <Roster/>
          </View>
          <View style={styles.groupArea}>
            <View style={styles.subGroupArea}>
              <Group location={GROUP_ONE} />
              <Group location={GROUP_TWO} />
            </View>
            <View style={styles.subGroupArea}>
              <Group location={GROUP_THREE} />
              <Group location={GROUP_FOUR} />
            </View>
            <View style={styles.subGroupArea}>
              <Group location={GROUP_FIVE} />
              <Group location={GROUP_SIX} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  reportIsActive: reportIsActive(state)
});

export default connect(
  mapStateToProps,
  {
    startIncident,
  }
)(IncidentScreen);

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
    padding: 5,
    backgroundColor: colors.primary.dark
  },
  subGroupArea: {
    flexDirection: "column",
    flex: 1
  }
});

