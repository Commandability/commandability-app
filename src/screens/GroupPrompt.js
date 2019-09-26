import React, { Component } from "react";
import { AppRegistry, TextInput, TouchableOpacity, Flatlist, Text, View, Image, Alert, stylestyleSheet} from "react-native";

default class GroupPrompt extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      text: '',
    };
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
          onChangeText={(text) => this.setState({text})}
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
    groupName: getNameByLocation(location),
    visibility: getVisibilityByLocation(location)
  };
};

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    setLocationById
  }
)(GroupPrompt);