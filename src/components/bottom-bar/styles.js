import { StyleSheet } from 'react-native';

export default () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingRight: 16,
    },
    timer: {
      width: 100,
    },
    options: {
      flexDirection: 'row',
    },
  });
