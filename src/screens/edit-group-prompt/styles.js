import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    pickerContainer: {
      borderRadius: 5,
      margin: 24,
      height: 48,
      width: '25%',
      backgroundColor: colors.background.two,
    },
    picker: {
      width: '100%',
      color: colors.text.main,
    },
  });
