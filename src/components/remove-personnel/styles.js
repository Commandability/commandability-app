import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.overlay,
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      opacity: 0.2,
      borderRadius: 5,
    },
    container: {
      flexDirection: 'column',
      backgroundColor: colors.background.two,
      width: '100%',
      marginTop: 16,
      borderRadius: 5,
    },
    remove: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 100,
      width: '100%',
      backgroundColor: colors.background.three,
      borderRadius: 5,
    },
    header: {
      padding: 4,
      fontSize: 14,
      color: colors.text.main,
    },
    icon: {
      fontSize: 36,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.primary,
    },
  });
