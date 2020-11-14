import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 16,
      marginBottom: 8,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    option: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: '100%',
      paddingVertical: 4,
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
    buttonContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.background.one,
    },
    optionContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.primary,
    },
    disabledOptionContent: {
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.disabled,
    },
    icon: {
      fontSize: 36,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.primary,
    },
    disabledIcon: {
      fontSize: 36,
      marginTop: 10,
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
