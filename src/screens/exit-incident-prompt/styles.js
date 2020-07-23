import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark.main,
  },
  prompt: {
    color: colors.text.light,
  },
  emailInput: {
    height: 40,
    color: colors.text.light,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
});
