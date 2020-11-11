/**
 * NewPersonnelItem Component
 *
 * Manages displaying a person in a the new personnel list and sets a person's locationId in redux to STAGING when selected.
 */

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import { removePerson, setPersonLocationId } from '../../redux/actions';
import { ROSTER, NEW_PERSONNEL } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class NewPersonnelItem extends PureComponent {
  constructor() {
    super();
    this._onPress = this._onPress.bind(this); // use bind to avoid duplicating methods on demanding components
  }

  _onPress() {
    const {
      item,
      item: { temporary },
      removePerson,
      setPersonLocationId,
    } = this.props;

    Alert.alert('Remove person?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          temporary
            ? removePerson(item)
            : setPersonLocationId(
                item,
                { locationId: NEW_PERSONNEL, name: 'New Personnel' },
                { locationId: ROSTER, name: 'Roster' }
              );
        },
      },
    ]);
  }

  render() {
    const {
      item: { firstName, lastName, badge, shift },
      theme,
    } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <TouchableOpacity onPress={this._onPress} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.mainLine}>
            <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.label}>{`${badge ? badge + ' ' : ''}`}</Text>
            <Text style={styles.label}>{`${shift ? shift : ''}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// props validation
NewPersonnelItem.propTypes = {
  removePerson: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  item: PropTypes.object, // the current person
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    removePerson,
    setPersonLocationId,
  }
)(NewPersonnelItem);
