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
    prompt: {
      margin: 24,
    },
    promptText: {
      fontSize: 24,
      marginBottom: 8,
      color: colors.text.main,
    },
    label: {
      color: colors.primary,
      marginLeft: 24,
    },
    passwordInput: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5,
    },
  });
