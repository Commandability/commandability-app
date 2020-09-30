/**
 * NewPersonnelList Component
 *
 * Manages displaying personnel in the new personnel list.
 */

import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPersonnelByLocationId } from '../../redux/selectors';
import NewPersonnelItem from '../new-personnel-item';
import { NEW_PERSONNEL } from '../../modules/location-ids';
import styles from './styles';

class NewPersonnelList extends React.PureComponent {
  _renderItem = ({ item }) => {
    return <NewPersonnelItem item={item} />;
  };

  _keyExtractor = item => item.id;

  render() {
    const { personnel } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={personnel}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        extraData={this.props}
      />
    );
  }
}

// props validation
NewPersonnelList.propTypes = {
  personnel: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocationId(state, NEW_PERSONNEL),
  };
};

export default connect(
  mapStateToProps,
  null
)(NewPersonnelList);
