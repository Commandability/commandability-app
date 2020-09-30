import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.one,
      flex: 1,
      flexDirection: 'row',
    },
    section: {
      flex: 1,
      padding: 24,
    },
    option: {
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 16,
      marginBottom: 8,
      backgroundColor: colors.background.two,
    },
    optionContent: {
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.main,
    },
  });
