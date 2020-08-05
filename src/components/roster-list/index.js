/**
 * RosterList Component
 *
 * Manages displaying personnel in the roster.
 */

import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPersonnelByLocationId } from '../../redux/selectors';
import RosterItem from '../roster-item';
import { ROSTER } from '../../modules/location-ids';
import styles from './styles';

class RosterList extends React.PureComponent {
  _renderItem = ({ item }) => {
    return <RosterItem item={item} />;
  };

  _keyExtractor = item => item.id;

  render() {
    const { personnel, query } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={
          query
            ? personnel.filter(person => {
                const { firstName, lastName, badge, shift } =
                  person || undefined;
                return (
                  firstName.toLowerCase().includes(query) ||
                  lastName.toLowerCase().includes(query) ||
                  (badge ? badge.includes(query) : false) ||
                  (shift ? shift.includes(query) : false)
                );
              })
            : personnel
        }
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        extraData={this.props}
      />
    );
  }
}

// props validation
RosterList.propTypes = {
  personnel: PropTypes.array,
  query: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocationId(state, ROSTER),
  };
};

export default connect(
  mapStateToProps,
  null
)(RosterList);
