import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginBottom: 16,
      marginHorizontal: 8,
    },
    timerContent: {
      fontFamily: 'ClearSans-Regular',
      fontSize: 14,
      color: colors.text.main,
    },
  });
