/**
 * StagingList Component
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the list when it is selected.
 */

import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPersonnelByLocationId } from '../../redux/selectors';
import ListItem from '../list-item';
import { STAGING } from '../../modules/location-ids';
import styles from './styles';

class StagingList extends React.PureComponent {
  _renderItem = ({ item }) => {
    return <ListItem locationId={STAGING} item={item} />;
  };

  _keyExtractor = item => item.id;

  render() {
    const { personnel } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={personnel}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          extraData={this.props}
        />
      </View>
    );
  }
}

StagingList.propTypes = {
  locationId: PropTypes.string,
  personnel: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocationId(state, STAGING),
  };
};

export default connect(
  mapStateToProps,
  null
)(StagingList);
