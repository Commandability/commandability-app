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
      justifyContent: 'center',
      backgroundColor: colors.background.one,
      padding: 24,
    },
    content: {
      marginTop: 24,
    },
    label: {
      color: colors.primary,
      marginLeft: 24,
    },
    textInput: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5
    },
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      padding: 48,
      margin: 24,
      borderRadius: 5
    },
    icon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 30,
    },
    iconText: {
      fontSize: 42,
      color: colors.text.main,
    },
  });
