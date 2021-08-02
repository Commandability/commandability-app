import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    backOpacity: {
      position: 'absolute',
      left: 0,
      top: 24,
      zIndex: 1,
    },
    backIcon: {
      color: colors.primary,
      fontSize: 48,
    },
  });
