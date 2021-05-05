import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.overlay,
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      opacity: 0.2,
      borderRadius: 4,
    },
    container: {
      margin: 8,
      backgroundColor: colors.background.two,
      borderRadius: 4,
    },
    remove: {
      alignItems: 'center',
      backgroundColor: colors.background.three,
      borderRadius: 4,
    },
    header: {
      margin: 4,
      fontSize: 14,
      color: colors.text.main,
    },
    icon: {
      fontSize: 36,
      margin: 8,
      color: colors.primary,
    },
  });
