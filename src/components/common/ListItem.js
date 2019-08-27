import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getSelectedLocation } from "../../reducers";
import { toggleSelectedById } from "../../actions";
import { scaleFont } from "./Fonts";

class ListItem extends Component {
  _onPress = () => {
    const { item, groupName, toggleSelectedById } = this.props;
    toggleSelectedById(item.id, groupName);
  };

  render() {
    const { item, groupName, selectedLocation } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == groupName || selectedLocation == null
            ? false
            : true
        }
      >
        <View>
          <Text style={styles.itemContent}>
            {item.badge + " - " + item.firstName + " " + item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLocation: getSelectedLocation(state)
  };
};

export default connect(
  mapStateToProps,
  { toggleSelectedById }
)(ListItem);

var styles = StyleSheet.create({
  itemContent: {
    fontSize: scaleFont(6),
    paddingLeft: 2
  }
});
