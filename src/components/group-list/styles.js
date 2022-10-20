import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.three,
      flex: 1,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
  });
