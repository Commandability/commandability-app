/**
 * Page Component
 *
 * Displays all groups in a tab
 */

import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {pageLocations} from '../../utils/locations';
import Group from '../group';
import styles from './styles';

const Page = ({route: {key: page}}) => {
  return (
    <View style={styles.container}>
      {pageLocations[page].locationIds.map((locationId) => (
        <Group key={locationId} locationId={locationId} />
      ))}
    </View>
  );
};

Page.propTypes = {
  route: PropTypes.object,
};

export default Page;
