import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.overlay,
      position: 'absolute',
      right: 8,
      top: 8,
      zIndex: 1,
      width: '100%',
      height: '100%',
      opacity: 0.2,
      borderRadius: 8,
    },
    container: {
      height: '50%',
      width: `${100 / 3}%`,
      padding: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 4,
      backgroundColor: colors.background.three,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    headerContent: {
      fontSize: 14,
      color: colors.primary,
      letterSpacing: 0.5,
    },
    alertContainer: {
      flex: 1,
    },
    alert: {
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: 8,
    },
  });
