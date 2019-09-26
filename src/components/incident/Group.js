/**
 * Group Component
 *
 * props:
 *  - location: the current group's data location
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import COLORS from "../../modules/Colors";
import { scaleFont } from "../../modules/Fonts";
import GroupList from "./GroupList";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";

import { getNameByLocation, getVisibilityByLocation } from "../../reducers";
import { addGroup } from "../../actions";

class Group extends Component {
  constructor() {
    super();
  }

  render() {
    if(visibility) {
      return (
        <View style={styles.groupLayout}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupHeaderContent}> {groupName} </Text>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate("Prompt")}>
              <Image
                style={styles.settingsIcon}
                source={require("../../assets/settings_icon.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          <GroupList location={this.props.location} />
        </View>
      );
    }
    else {
      return(
        <View style={{flex: 1}}>
          <TouchableOpacity style={{flex:1}} onPress={addGroup(location)}>
            <Image
            style={styles.addButton}
            source={require("../../assets/add.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return {
    groupName: getNameByLocation(state, location),
    visibility: getVisibilityByLocation(state, location)
  };
};

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
  settingsIcon: {
    flex: 1,
    padding: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default withNavigation(connect(
  mapStateToProps,
  {
    addGroup,
  }
)(Group));