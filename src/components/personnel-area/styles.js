import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      borderRadius: 5,
      padding: 8,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 225,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginBottom: 16,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    optionContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.alternate,
    },
  });
