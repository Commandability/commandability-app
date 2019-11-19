/**
 * GroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { StackNavigatior } from "react-navigation";
import { connect } from "react-redux";

import { getNameByLocation, getVisibilityByLocation } from "../reducers";

import { removeGroup, editName, logRemoveGroup, logEditName } from "../actions";

class GroupPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  static navigationOptions = {
    title: "Edit Group"
  };

  _onRemovePressed = () => {
    const { navigation, removeGroup, local } = this.props;
    const { goBack } = navigation;
    removeGroup({ location: local });
    logRemoveGroup({location: local, time: "anytime"})
    goBack();
  };

  _onEditPressed = () => {
    const { navigation, editName, local } = this.props;
    const { text } = this.state || {};
    const { goBack } = navigation;
    editName({ location: local, name: text });
    logEditName({ location: local, name: text, time: "anytime"})
    goBack();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ borderColor: "gray", borderWidth: 1 }}
            placeholder="Please enter a new group name"
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
          />
        </View>

        <View style={{ flex: 1, borderWidth: 1 }}>
          <TouchableOpacity onPress={this._onEditPressed}>
            <Text>Save name change and exit</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, borderWidth: 1 }}>
          <TouchableOpacity onPress={this._onRemovePressed}>
            <Text>Delete Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const local = ownProps.navigation.getParam("local", "default");
  return {
    groupName: getNameByLocation(state, local),
    visibility: getVisibilityByLocation(state, local),
    local: local
  };
};

export default connect(
  mapStateToProps,
  {
    removeGroup,
    editName
  }
)(GroupPrompt);
