import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.three,
      flex: 1,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
  });
