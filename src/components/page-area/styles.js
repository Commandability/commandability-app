import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
      backgroundColor: colors.background.two,
      borderRadius: 4,
    },
    page: {
      flex: 1,
    },
    tabBar: {
      backgroundColor: colors.background.three,
      margin: 8,
      elevation: 0,
    },
    tabLabel: {
      color: colors.text.main,
    },
    tabAlertLabel: {
      color: colors.primary,
    },
    indicator: {
      backgroundColor: colors.primary,
    },
  });
