import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet
} from "react-native";
import auth from "@react-native-firebase/auth";
import NetInfo from "@react-native-community/netinfo";

import { NavBar, Group, Staging, Roster } from "../components/incident";
import COLORS from "../modules/colors";

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
      .catch(error => {
        // handle network connection errors
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            let message = "";
            switch (error.code) {
              case "auth/invalid-email":
                message = "The email address you entered is invalid. ";
                break;
              case "auth/user-not-found":
              case "auth/wrong-password":
                message =
                  "The username and password you entered do not match our records. ";
                break;
              default:
                message = "Unknown error. ";
            }

            Alert.alert("Error", message, [
              {
                text: "OK"
              }
            ]);
          } else {
            Alert.alert(
              "Failed to connect to the network. ",
              "Please check your network connection status. ",
              [
                {
                  text: "OK"
                }
              ]
            );
          }
        });

        this.setState(prevState => ({
          loading: false,
          email: prevState.email,
          password: ""
        }));
      });
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
          disabled={this.state.email && this.state.password ? false : true}
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
    marginBottom: 8
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
