import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    backOpacity: {
      position: 'absolute',
      left: 24,
      top: 24,
    },
    backIcon: {
      color: colors.primary,
      fontSize: 42,
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
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      padding: 48,
      margin: 24,
      borderRadius: 5,
    },
    opacityText: {
      fontSize: 42,
      color: colors.text.main,
    },
    icon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 32,
    },
  });
