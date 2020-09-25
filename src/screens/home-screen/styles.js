import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 80,
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
    },
    icon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 30,
    },
    opacityText: {
      fontSize: 42,
      color: colors.text.main,
    },
  });
