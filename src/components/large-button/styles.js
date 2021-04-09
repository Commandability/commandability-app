import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5,
    },
    fixed: {
      padding: 48,
    },
    flex: {
      flex: 1,
    },
    priority: {
      borderWidth: 1,
      borderColor: colors.primary,
    },
    opacityText: {
      fontSize: 42,
      color: colors.text.main,
    },
    opacityIcon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 32,
    },
  });
