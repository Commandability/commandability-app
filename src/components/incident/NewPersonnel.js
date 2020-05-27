import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';
import { addPerson, setPersonLocationId } from '../../actions';
import { STAGING } from '../../modules/locationIds';

class NewPersonnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      badge: '',
    };
  }

  _onAddPressed = () => {
    const { addPerson, setPersonLocationId } = this.props;
    const person = {
      badge: this.state.badge,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    this.setState({firstName: '', lastName: '', badge: ''});
    console.log(person);
    addPerson(person, true);
    setPersonLocationId(
      person,
      { locationId: '', name: 'New Entry' },
      { locationId: STAGING, name: 'Staging' }
    );
  }

  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupHeaderContent}> Add Temporary Personnel </Text>
        </View>
        <View style={styles.firstNameStyle}>
          <TextInput
            style={styles.buttonContainer}
            placeholder="First Name"
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
        </View>
        <View style={styles.lastNameStyle}>
          <TextInput
            style={styles.buttonContainer}
            placeholder="Last Name"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
        </View>
        <View style={styles.badgeNumberStyle}>
          <TextInput
            style={styles.buttonContainer}
            placeholder="Badge Number"
            value={this.state.badge}
            onChangeText={badge => this.setState({ badge })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onAddPressed}
            disabled={this.state.firstName === '' || this.state.lastName === ''}
          >
            <Text style={styles.buttonContent}> Add New Entry </Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

NewPersonnel.propTypes = {
  addPerson: PropTypes.func,
  setPersonLocationId: PropTypes.func,  
};

export default connect( null, { setPersonLocationId, addPerson })(NewPersonnel);

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
  },
  firstNameStyle: {
    flex: 1,
  },
  lastNameStyle: {
    flex: 1,
  },
  badgeNumberStyle: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: colors.secondary.dark,
  },
  groupHeaderContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.primary.text,
  },
});
