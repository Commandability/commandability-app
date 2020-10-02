import { StyleSheet } from 'react-native';

export default colors =>
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
      color: colors.text.main,
      backgroundColor: colors.background.two,
    },
    queryInput: {
      height: 40,
      color: colors.text.main,
      borderColor: colors.primary,
      borderBottomWidth: 1,
      marginBottom: 16,
      marginTop: 8,
      marginHorizontal: 8,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    headerContent: {
      fontSize: 18,
      color: colors.text.main,
    },
  });
