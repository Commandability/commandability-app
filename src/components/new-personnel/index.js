/**
 * NewPersonnel Component
 *
 * Manages adding a new person to the roster.
 */

import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Text style={styles.headerContent}> Add Personnel </Text>
          </View>
          <Text style={styles.label}>First Name*</Text>
          <TextInput
            style={styles.locationInput}
            maxLength={36}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
          <Text style={styles.label}>Last Name*</Text>
          <TextInput
            style={styles.locationInput}
            maxLength={36}
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
          <Text style={styles.label}>Badge Number</Text>
          <TextInput
            style={styles.locationInput}
            keyboardType={'numeric'}
            maxLength={10}
            value={this.state.badge}
            onChangeText={badge => this.setState({ badge })}
          />
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._onAddPressed}
            disabled={this.state.firstName === '' || this.state.lastName === ''}
          >
            <Icon name="account-plus" style={styles.icon} />
            <Text style={styles.opacityText}> Add New Entry </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
