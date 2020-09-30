/**
 * RosterItem Component
 *
 * Manages displaying a person in a the roster and sets a person's locationId in redux to NEW_PERSONNEL when selected.
 */

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import { setPersonLocationId } from '../../redux/actions';
import { ROSTER, NEW_PERSONNEL } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class RosterItem extends PureComponent {
  constructor() {
    super();
    this._onPress = this._onPress.bind(this); // use bind to avoid duplicating methods on demanding components
  }

  _onPress() {
    const { item, setPersonLocationId } = this.props;
    setPersonLocationId(
      item,
      { locationId: ROSTER, name: 'Roster' },
      { locationId: NEW_PERSONNEL, name: 'New Personnel' }
    );
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
RosterItem.propTypes = {
  setPersonLocationId: PropTypes.func,
  item: PropTypes.object, // the current person
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  { setPersonLocationId }
)(RosterItem);
