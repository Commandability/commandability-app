import {StyleSheet} from 'react-native';

export default (colors) =>
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
  });
