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
import { withNavigation } from 'react-navigation';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
    }
  }

  _toggleVisibility = () => {
    this.setState(prevState => ({
      visibility: !prevState.visibility
    }));
  }

  render() {
    if(this.state.visibility) {
      return (
        <View style={styles.groupLayout}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupHeaderContent}> Group Title </Text>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate("Prompt")}>
              <Image
                style={styles.settingsIcon}
                source={require("../../assets/settings_icon.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          <GroupList groupName={this.props.groupName} />
        </View>
      );
    }
    else {
      return(
        <View style={{flex: 1}}>
          <TouchableOpacity style={{flex:1}} onPress={this._toggleVisibility}>
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

export default withNavigation(Group);