/**
 * NewPersonnel Component
 *
 * Manages adding a new person to the roster.
 */

import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addPerson, setPersonLocationId } from '../../redux/actions';
import { STAGING } from '../../modules/location-ids';
import styles from './styles';

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
    this.setState({ firstName: '', lastName: '', badge: '' });
    addPerson(person, true, STAGING);
    setPersonLocationId(
      person,
      { locationId: '', name: 'New Entry' },
      { locationId: STAGING, name: 'Staging' }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerContent}> Add Personnel </Text>
        </View>
        <View style={styles.firstNameStyle}>
          <Text style={styles.labelStyle}>First Name*</Text>
          <TextInput
            style={styles.buttonContainer}
            maxLength={36}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
        </View>
        <View style={styles.lastNameStyle}>
          <Text style={styles.labelStyle}>Last Name*</Text>
          <TextInput
            style={styles.buttonContainer}
            maxLength={36}
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
        </View>
        <View style={styles.badgeNumberStyle}>
          <Text style={styles.labelStyle}>Badge Number</Text>
          <TextInput
            style={styles.buttonContainer}
            keyboardType={'numeric'}
            maxLength={10}
            value={this.state.badge}
            onChangeText={badge => this.setState({ badge })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            //style={styles.container}
            style={[
              styles.buttonContainer,
              this.state.firstName === '' || this.state.lastName === ''
                ? styles.buttonContainerDisabled
                : styles.buttonContainer,
            ]}
            onPress={this._onAddPressed}
            disabled={this.state.firstName === '' || this.state.lastName === ''}
          >
            <Text
              style={[
                styles.buttonContent,
                this.state.firstName === '' || this.state.lastName === ''
                  ? styles.buttonContentDisabled
                  : styles.buttonContent,
              ]}
            >
              {' '}
              Add New Entry{' '}
            </Text>
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

export default connect(
  null,
  { setPersonLocationId, addPerson }
)(NewPersonnel);
