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
      borderRadius: 8,
    },
    container: {
      margin: 8,
      backgroundColor: colors.background.two,
      borderRadius: 8,
    },
    remove: {
      alignItems: 'center',
      backgroundColor: colors.background.three,
      borderRadius: 8,
    },
    header: {
      margin: 4,
      fontFamily: 'ClearSans-Regular',
      fontSize: 14,
      color: colors.text.main,
      letterSpacing: 0.5,
    },
    icon: {
      fontSize: 36,
      margin: 8,
      color: colors.primary,
    },
  });
