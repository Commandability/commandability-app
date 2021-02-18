import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
      padding: 24,
      flexDirection: 'row',
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
      padding: 8,
      alignItems: 'center',
      width: Dimensions.get('window').width / 4,
      marginRight: 48,
      backgroundColor: colors.background.two,
      borderRadius: 5,
    },
  });
