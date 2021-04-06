/**
 * Global styles module
 */

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
    label: {
      color: colors.primary,
      marginLeft: 24,
    },
    input: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5,
      paddingLeft: 16,
    },
    multilineInput: {
      height: 144,
      textAlignVertical: 'top',
      color: colors.text.main,
      borderColor: colors.primary,
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5,
      paddingLeft: 16,
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
