import {StyleSheet, Dimensions} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.one,
      flex: 1,
    },
    mainArea: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: 8,
    },

    /**
     * Solve for x such that all locations are of equal width:
     *
     * locationWidth = (width - allMargins) / numLocations
     * locationWidth + sideBarMargins = 0.25 * deviceWidth + x
     * (numLocations - 1) * locationWidth + pageAreaMargins = 0.75 * deviceWidth - x
     *
     * Given:
     * sideBarMargins = 32
     * pageAreaMargins = 64
     * allMargins = 96
     * numLocations = 4
     *
     * Solution:
     * x = 8
     */

    sideBar: {
      width: Dimensions.get('window').width * 0.25 + 8, // x = 8
    },
    pageArea: {
      width: Dimensions.get('window').width * 0.75 - 8, // x = 8
    },
  });
