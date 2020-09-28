import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    label: {
      textAlign: 'left',
      fontSize: 14,
      color: colors.text.disabled,
    },
  });
