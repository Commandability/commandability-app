import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.overlay,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      opacity: 0.2,
      borderRadius: 5,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background.three,
      width: '100%',
      marginTop: 16,
      borderRadius: 5,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    headerContent: {
      fontSize: 14,
      color: colors.text.main,
    },
  });
