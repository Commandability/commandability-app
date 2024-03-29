import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    pickerContainer: {
      borderRadius: 8,
      marginVertical: 16,
      backgroundColor: colors.background.two,
    },
    picker: {
      fontFamily: 'ClearSans-Regular',
      color: colors.text.main,
    },
  });
