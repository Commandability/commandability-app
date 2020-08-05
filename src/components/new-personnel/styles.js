import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    padding: 16,
    color: colors.text.light,
  },
  labelStyle: {
    padding: 4,
  },
  buttonContainer: {
    padding: 4,
    borderWidth: 0.5,
    backgroundColor: colors.primary.dark,
  },
  buttonContainerDisabled: {
    tintColor: colors.design.disabled,
  },
  buttonContent: {
    textAlign: 'center',
    alignItems: 'center',
    color: colors.primary.text,
    fontSize: scaleFont(6),
    padding: 4,
  },
  buttonContentDisabled: {
    color: colors.design.disabledFont,
  },
  labelContentStyle: {
    padding: 4,
    fontSize: scaleFont(6),
    color: colors.text.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    fontSize: scaleFont(8),
    textAlign: 'center',
    color: colors.text.light,
  },
});
