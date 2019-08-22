/**
 * Tester Component
 * 
 * props: 
 *  - none
 * 
 * Sample component for testing purposes. 
 */

import React, { Component } from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import { resetApp } from "../actions";

class Tester extends Component {
  constructor() {
    super();
    this.state = {};
  }

  _onPress = () => {
    const { resetApp } = this.props;
    resetApp();
  }

  render() {
    return (
      <Button
        onPress={this._onPress}
        title="Reset App"
      />
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   const {  } = ownProps;
//   return {
    
//   };
// };

export default connect(
  null,
  { resetApp }
)(Tester);
