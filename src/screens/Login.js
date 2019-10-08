import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  StyleSheet
} from "react-native";
import auth from "@react-native-firebase/auth";

import { NavBar, Group, Staging, Roster } from "../components/incident";
import COLORS from "../modules/colors";

const email = "test@test.com";
const password = "password";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { loading: false, email: "", password: "" };
  }

  _signIn = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("AppStack");
      })
      .catch(error =>
        this.setState(prevState => ({
          loading: false,
          errorMessage: error,
          email: prevState.email,
          password: ""
        }))
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor={COLORS.primary.light}
          disableFullscreenUI
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor={COLORS.primary.light}
          disableFullscreenUI
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          onPress={this._signIn}
          title="Sign in"
          color={COLORS.primary.light}
        />
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={COLORS.secondary.light}
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
    backgroundColor: COLORS.primary.dark,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    color: "white",
    borderColor: COLORS.primary.light,
    borderWidth: 1,
    margin: 8
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 80
  }
});
