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
    opacity: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5,
    },
    icon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 32,
    },
    opacityContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    opacityText: {
      fontSize: 42,
      color: colors.text.main,
    },
    reportsNumber: {
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
