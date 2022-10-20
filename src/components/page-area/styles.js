import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
      backgroundColor: colors.background.two,
      borderRadius: 8,
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
      letterSpacing: 0.5,
    },
    tabAlertLabel: {
      color: colors.primary,
      letterSpacing: 0.5,
    },
    indicator: {
      backgroundColor: colors.primary,
    },
  });
