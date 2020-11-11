import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      height: '20%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 16,
      marginBottom: 8,
      backgroundColor: colors.background.two,
    },
    disabledOption: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 4,
      marginTop: 16,
      backgroundColor: colors.background.two,
      flex: 1,
    },
    optionContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.main,
    },
    disabledOptionContent: {
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.disabled,
    },
    selected: {
      color: colors.primary,
    },
    deselected: {
      color: colors.text.main,
    },
  });
