import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 24,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
      padding: 24,
    },
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    reportsNumberContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    reportsNumber: {
      fontSize: 42,
      color: colors.text.main,
      paddingHorizontal: 12,
      marginLeft: 32,
      borderRadius: 5,
    },
    reportsOnDevice: {
      backgroundColor: colors.primary,
      color: colors.background.one,
    },
    noReportsOnDevice: {
      backgroundColor: colors.background.three,
      color: colors.text.disabled,
    },
  });
