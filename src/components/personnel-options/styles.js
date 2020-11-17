import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 250,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginBottom: 16,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    remove: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: '100%',
      paddingVertical: 4,
      marginTop: 16,
      backgroundColor: colors.background.two,
      borderRadius: 5,
    },
    optionContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.background.one,
    },
    removeContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.primary,
    },
    icon: {
      fontSize: 36,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.primary,
    },
    selected: {
      color: colors.primary,
    },
  });
