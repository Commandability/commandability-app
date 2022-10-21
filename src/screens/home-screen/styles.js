import {Platform, StatusBar, StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
    },
    opacityGrid: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
      marginBottom: 16,
      marginTop: Platform.OS === 'ios' ? 24 : StatusBar.currentHeight + 16,
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
      borderRadius: 8,
    },
    opacityText: {
      color: colors.text.main,
      fontFamily: 'ClearSans-Regular',
      fontSize: 48,
    },
    opacityIcon: {
      marginRight: 16,
      color: colors.primary,
    },
    outlinedOpacity: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 8,
    },
    reportsNumberContainer: {
      paddingHorizontal: 12,
      marginLeft: 32,
      borderRadius: 8,
    },
    reportsOnDeviceContainer: {
      backgroundColor: colors.primary,
    },
    noReportsOnDeviceContainer: {
      backgroundColor: colors.background.three,
    },
    reportsNumber: {
      fontFamily: 'ClearSans-Regular',
      fontSize: 42,
      color: colors.text.main,
    },
    reportsOnDevice: {
      color: colors.text.alternate,
    },
    noReportsOnDevice: {
      color: colors.text.disabled,
    },
  });
