import {StyleSheet, Dimensions} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 16,
      backgroundColor: colors.background.one,
    },
    leftCol: {
      flex: 1,
      alignItems: 'flex-end',
    },
    rightCol: {
      flex: 1,
      alignItems: 'flex-start',
    },
    colContainer: {
      flex: 1,

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

      width: Dimensions.get('window').width * 0.25 - 8, // x = 8
      marginHorizontal: 48,
      backgroundColor: colors.background.two,
      borderRadius: 4,
    },
    colButton: {
      alignSelf: 'center',
      margin: 8,
    },
  });
