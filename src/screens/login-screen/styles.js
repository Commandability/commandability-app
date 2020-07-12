import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});
