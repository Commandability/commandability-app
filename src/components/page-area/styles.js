import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    page: {
      flex: 1,
      marginTop: 16,
    },
    tabBar: {
      backgroundColor: colors.background.three,
      marginHorizontal: 8,
      marginTop: 0,
      elevation: 0,
    },
    tabLabel: {
      color: colors.text.main,
    },
    indicator: {
      backgroundColor: colors.primary,
    },
  });
