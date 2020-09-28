import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.one,
      flex: 1,
      flexDirection: 'row',
    },
    section: {
      flex: 1,
      padding: 24,
    },
  });
