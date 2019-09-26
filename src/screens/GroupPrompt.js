/**
 * GroupPrompt Component
 * 
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from "react";
import { TextInput, TouchableOpacity, Text, View, stylestyleSheet} from "react-native";
import { connect } from "react-redux";

import {
  getNameByLocation,
  getVisibilityByLocation
} from "../reducers";

import { removeGroup, editName } from "../actions";

class GroupPrompt extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      text: groupName,
    }
  }
  static navigationOptions = {
    title: 'Edit Group',
  }
  render() {
    return (
      <View>
        <TextInput  
          style={{borderColor: 'gray', borderWidth: 1}}
          placeholder = "Please enter a new group name" 
          onChangeText={(text) => this.setState.text}
          value={this.state.text}
          
        />
        <Text> Select all personnel in group </Text>
        <Text> Delete group </Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return {
    groupName: getNameByLocation(state, location),
    visibility: getVisibilityByLocation(state, location)
  };
};

export default connect(
  mapStateToProps,
  {
    removeGroup,
    editName
  }
)(GroupPrompt);