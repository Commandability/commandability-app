/**
 * GroupPrompt Component
 * 
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from "react";
import { TextInput, TouchableOpacity, Text, View, stylestyleSheet} from "react-native";
import { StackNavigatior} from 'react-navigation';
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
      text: '',
    }
  }
  static navigationOptions = {
    title: 'Edit Group',
  }

  _onRemovePressed = (local) => {
    this.props.removeGroup({ location: local})
  };

  _onEditPressed =(local, value) => {
    this.props.editName({location: local, name: value})
  };

  render() {
    const {goBack} = this.props.navigation;
    const { groupName, visibility, local } = this.props;
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <TextInput  
            style={{borderColor: 'gray', borderWidth: 1}}
            placeholder = "Please enter a new group name"
            value={this.state.text}
            onChangeText={(text) => this.setState({ text: text})}
          />
          <Text> Select all personnel in group </Text>
        </View>
        <View style={{flex:1, borderWidth: 1}}>
          <TouchableOpacity onPress={this._onEditPressed(local, this.state.text)} onPress={() => goBack(null)}>
            <Text>Save name change and exit</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1, borderWidth: 1}}>
          <TouchableOpacity  onPress={this._onRemovePressed(local)} onPress={() => goBack(null)}><Text> Delete Group</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const local = ownProps.navigation.getParam('local', 'default');
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