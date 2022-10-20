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
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background.one,
    },
    flex: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    label: {
      fontFamily: 'ClearSans-Regular',
      color: colors.primary,
    },
    input: {
      height: 48,
      fontFamily: 'ClearSans-Regular',
      color: colors.text.main,
      backgroundColor: colors.background.two,
      borderRadius: 8,
      marginVertical: 16,
      paddingLeft: 16,
    },
    multilineInput: {
      height: 144,
      textAlignVertical: 'top',
      fontFamily: 'ClearSans-Regular',
      color: colors.text.main,
      borderColor: colors.primary,
      backgroundColor: colors.background.two,
      marginVertical: 16,
      borderRadius: 8,
      paddingLeft: 16,
    },
    prompt: {
      marginVertical: 16,
    },
    promptHeader: {
      fontFamily: 'ClearSans-Regular',
      fontSize: 32,
      marginBottom: 8,
      color: colors.primary,
    },
    promptText: {
      fontFamily: 'ClearSans-Regular',
      fontSize: 24,
      marginBottom: 8,
      color: colors.text.main,
    },
  });
