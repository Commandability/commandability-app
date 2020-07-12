import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
  emailInput: {
    height: 40,
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
});
