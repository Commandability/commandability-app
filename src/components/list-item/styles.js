import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    selected: {
      backgroundColor: colors.background.three,
    },
    content: {
      borderBottomWidth: 1,
      borderBottomColor: colors.text.disabled,
      marginHorizontal: 8,
      paddingVertical: 4,
    },
    mainLine: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    line: {
      flex: 1,
      flexDirection: 'row',
    },
    name: {
      flex: 1,
      textAlign: 'left',
      color: colors.text.main,
    },
    time: {
      flex: 1,
      textAlign: 'right',
      color: colors.text.disabled,
    },
    timeWarning: {
      color: colors.primary,
    },
    label: {
      textAlign: 'left',
      fontSize: 10,
      color: colors.text.disabled,
    },
  });
