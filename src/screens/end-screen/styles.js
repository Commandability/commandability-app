import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';

export default StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  locationInput: {
    height: 40,
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  notesInput: {
    height: 120,
    textAlignVertical: 'top',
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
});
