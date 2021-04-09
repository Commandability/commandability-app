/**
 * Page Component
 *
 * Manages displaying all groups in a tab.
 */

import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {pageLocationIds} from '../../utils/locations.js';
import Group from '../group';
import styles from './styles';

const Page = ({route: {key}}) => {
  return (
    <View style={styles.container}>
      {pageLocationIds[key].locationIds.map((locationId) => (
        <Group key={locationId} locationId={locationId} />
      ))}
    </View>
  );
};

// props validation
Page.propTypes = {
  route: PropTypes.object,
};

export default Page;
