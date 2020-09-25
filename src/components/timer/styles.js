import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    timer: {
      flex: 1,
      justifyContent: 'center',
    },
    timerContent: {
      fontSize: 14,
      textAlignVertical: 'center',
      textAlign: 'center',
      color: colors.text.main,
    },
  });
