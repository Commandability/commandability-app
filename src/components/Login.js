import React, { Component } from "react";
import { Button, View } from "react-native";
import auth from "@react-native-firebase/auth";

const email = "test@test.com";
const password = "password";

export default class Login extends React.PureComponent {
  _createAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  _signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  render() {
    return (
      <View>
        <Button onPress={this._createAccount} title="Create Account" />
        <Button onPress={this._signIn} title="Sign in" />
      </View>
    );
  }
}
