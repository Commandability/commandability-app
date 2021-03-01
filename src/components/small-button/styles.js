import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 225,
      paddingVertical: 4,
      marginHorizontal: 12,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    opacityContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.alternate,
    },
    selectedOpacity: {
      backgroundColor: colors.background.three,
    },
    selectedOpacityContent: {
      color: colors.primary,
    },
  });
