import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      paddingVertical: 4,
      marginVertical: 16,
    },
    opacityText: {
      fontSize: 24,
    },
    opacityIcon: {
      marginRight: 8,
    },
    contained: {
      backgroundColor: colors.primary,
    },
    outlined: {
      borderWidth: 1,
      borderColor: colors.primary,
    },
    containedText: {
      color: colors.text.alternate,
    },
    outlinedText: {
      color: colors.primary,
    },
  });
