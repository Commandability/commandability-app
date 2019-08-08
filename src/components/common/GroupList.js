/**
 * List rendering component using redux
 */

import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import ListItem from "./ListItem";

// needs to be created with ID
class GroupList extends Component {
  _renderItem({ item }) {
    return <ListItem item={item} />;
  }

  render() {
    return (
      <FlatList
        // display state saved to props
        data={this.props.group}
        renderItem={this._renderItem}
        keyExtractor={item => item.badge}
      />
    );
  }
}

// save state retrieved from connect function to object that will be set as props
const mapStateToProps = state => {
  // object to become props
  return {
    group: state.groups
  };
};

// connect retrieves the state from the redux and is called before the component is rendered
export default connect(mapStateToProps)(GroupList, {
  // replaces mapStateToDispatch
  movePersonnel: movePersonnel
});
