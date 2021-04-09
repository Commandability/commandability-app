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
    },
    container: {
      flex: 1,
    },
    content: {
      borderBottomWidth: 1,
      borderBottomColor: colors.text.disabled,
      marginHorizontal: 8,
      paddingVertical: 4,
    },
    mainLine: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    line: {
      flex: 1,
      flexDirection: 'row',
    },
    alertText: {
      color: colors.primary,
    },
    name: {
      flex: 1,
      textAlign: 'left',
      color: colors.text.main,
    },
    time: {
      flex: 1,
      textAlign: 'right',
      color: colors.text.disabled,
    },
    timeWarning: {
      color: colors.primary,
    },
    label: {
      textAlign: 'left',
      fontSize: 10,
      color: colors.text.disabled,
    },
  });
