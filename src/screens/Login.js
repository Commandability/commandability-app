import React, { Component } from "react";
import { ActivityIndicator, Button, View, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

import { NavBar, Group, Staging, Roster } from "../components/incident";
import COLORS from "../modules/colors";

const email = "test@test.com";
const password = "password";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  _signIn = () => {
    this.setState({ loading: true });
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate("AppStack");
      })
      .catch(err => console.log(err.message));
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.primary.dark}}>
        <Button onPress={this._signIn} title="Sign in" />
        {this.state.loading && (
          <ActivityIndicator
            style={{ height: 80 }}
            color={COLORS.secondary.dark}
            size={"large"}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
