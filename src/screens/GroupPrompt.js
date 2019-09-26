import React, { Component } from "react";
import { AppRegistry, TextInput, TouchableOpacity, Flatlist, Text, View, Image, Alert, stylestyleSheet} from "react-native";

import {
  getNameByLocation,
  getVisibilityByLocation
} from "../../reducers";
import { removeGroup, editName } from "../../actions";

default class GroupPrompt extends React.PureComponent {
  constructor(props){
    super();
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
          onChangeText={(text) => editName(location, text))}
          value={groupName}
          
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