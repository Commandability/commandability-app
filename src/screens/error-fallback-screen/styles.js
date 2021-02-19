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
      marginLeft: 24,
      marginBottom: 72,
    },
    promptHeader: {
      fontSize: 48,
      marginBottom: 8,
      color: colors.primary,
    },
    promptText: {
      fontSize: 24,
      marginBottom: 8,
      color: colors.text.main,
    },
  });
