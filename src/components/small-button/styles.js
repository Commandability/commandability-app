import {StyleSheet, Dimensions} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: Dimensions.get('window').width * 0.18,
      paddingVertical: 4,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    opacityContent: {
      marginHorizontal: 2,
      fontSize: 14,
      color: colors.text.alternate,
    },
    selectedOpacity: {
      backgroundColor: colors.background.three,
    },
    selectedOpacityContent: {
      color: colors.primary,
    },
  });
