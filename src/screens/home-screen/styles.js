import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
    },
    opacityGrid: {
      flex: 1,
      justifyContent: 'center',
      margin: 16,
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
      margin: 16,
      borderRadius: 4,
    },
    opacityText: {
      color: colors.text.main,
      fontSize: 48,
    },
    opacityIcon: {
      marginRight: 16,
      color: colors.primary,
    },
    outlinedOpacity: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 4,
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
      borderRadius: 4,
    },
    reportsOnDevice: {
      backgroundColor: colors.primary,
      color: colors.text.alternate,
    },
    noReportsOnDevice: {
      backgroundColor: colors.background.three,
      color: colors.text.disabled,
    },
  });
