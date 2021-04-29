import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
    },
    options: {
      flexDirection: 'row',
    },
    bottomButton: {
      marginBottom: 16,
      marginHorizontal: 8,
    },
  });
