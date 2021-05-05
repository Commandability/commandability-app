/**
 * Global styles
 */

import {StyleSheet} from 'react-native';

export default (colors) =>
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
    formContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.background.one,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    margin: {
      flex: 1,
    },
    label: {
      color: colors.primary,
    },
    input: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      borderRadius: 4,
      marginVertical: 16,
      paddingLeft: 16,
    },
    multilineInput: {
      height: 144,
      textAlignVertical: 'top',
      color: colors.text.main,
      borderColor: colors.primary,
      backgroundColor: colors.background.two,
      marginVertical: 16,
      borderRadius: 4,
      paddingLeft: 16,
    },
    prompt: {
      marginVertical: 16,
    },
    promptHeader: {
      fontSize: 32,
      marginBottom: 8,
      color: colors.primary,
    },
    promptText: {
      fontSize: 24,
      marginBottom: 8,
      color: colors.text.main,
    },
  });
