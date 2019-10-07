import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet
} from "react-native";
import auth from "@react-native-firebase/auth";

import COLORS from "../modules/colors";

export default class Home extends Component {
  constructor() {
    super();
    this.state = { currentUser: null, loading: false };
  }

  componentDidMount() {
    const { currentUser } = auth();
    this.setState({ currentUser, loading: false });
  }

  _signOut = () => {
    this.setState(prevState => ({
      currentUser: prevState.currentUser,
      loading: true
    }));
    auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("AuthStack");
      })
      .catch(err => console.log(err.message));
  };

  render() {
    const { currentUser } = this.state;
    const { email } = currentUser || {}; // destructuring throws a type error with null objects
    return (
      <View style={styles.container}>
        <Text>Welcome to Command Ability {email}!</Text>
        <Button
          onPress={() => this.props.navigation.navigate("Incident")}
          title={"Start Incident"}
        ></Button>
        <Button onPress={this._signOut} title="Sign out" />
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
