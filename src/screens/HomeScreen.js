/**
 * HomeScreen component
 *
 * Manages displaying the home screen and activity indicator when signing out.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';

import { activeReport } from '../reducers';
import { updateUserData } from '../modules/configManager';
import colors from '../modules/colors';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = { currentUser: null, loading: false };
  }

  async componentDidMount() {
    const { currentUser } = auth();
    this.setState({ currentUser, loading: false });

    const { activeReport } = this.props;
    if (activeReport) {
      this.props.navigation.navigate('IncidentStack');
    }
    else{
      try {
        await updateUserData();
      } catch (error) {
        // ignore network connectivity errors
      }
    }
  }

  _signOut = () => {
    this.setState(prevState => ({
      currentUser: prevState.currentUser,
      loading: true,
    }));
    auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('AuthStack');
      })
      .catch(err => console.log(err.message));
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('IncidentScreen')}
          color={colors.primary.light}
          title={'Start Incident'}
        ></Button>
        <Button
          onPress={this._signOut}
          title="Sign out"
          color={colors.primary.light}
        />
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.secondary.dark}
            size={'large'}
          />
        )}
      </View>
    );
  }
}

// props validation
HomeScreen.propTypes = {
  navigation: PropTypes.object,
  activeReport: PropTypes.bool,
  navigate: PropTypes.func,
  reportData: PropTypes.object,
  email: PropTypes.string,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
});

export default connect(mapStateToProps, null)(HomeScreen);

const styles = StyleSheet.create({
  activityIndicator: {
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
});
