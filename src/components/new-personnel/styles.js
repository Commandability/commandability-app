import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('window').width / 4,
      color: colors.text.main,
      backgroundColor: colors.background.two,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    headerContent: {
      fontSize: 18,
      color: colors.text.main,
    },
  });
