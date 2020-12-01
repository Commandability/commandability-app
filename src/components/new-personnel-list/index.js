/**
 * NewPersonnelList Component
 *
 * Manages displaying personnel in the new personnel list.
 */

import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getPersonnelByLocationId } from '../../redux/selectors';
import NewPersonnelItem from '../new-personnel-item';
import { NEW_PERSONNEL } from '../../modules/location-ids';
import styles from './styles';

const NewPersonnelList = () => {
  const personnel = useSelector(state =>
    getPersonnelByLocationId(state, NEW_PERSONNEL)
  );

  const renderItem = ({ item }) => {
    return <NewPersonnelItem item={item} />;
  };

  // props validation
  renderItem.propTypes = {
    item: PropTypes.object,
  };

  const keyExtractor = item => item.id;

  return (
    <FlatList
      style={styles.container}
      data={personnel}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default NewPersonnelList;
