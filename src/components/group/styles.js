import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.overlay,
      position: 'absolute',
      top: 8,
      left: 8,
      zIndex: 1,
      width: '100%',
      height: '100%',
      opacity: 0.2,
    },
    container: {
      height: '50%',
      width: `${100 / 3}%`,
      padding: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
      width: '100%',
      backgroundColor: colors.background.two,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    headerContent: {
      fontSize: 14,
      color: colors.primary,
    },
  });
