import { StyleSheet } from 'react-native';
import { Colours } from '../../colours';
import { Fonts } from '../../fonts';

export const textStyles = StyleSheet.create({
  body: {
    fontFamily: Fonts.OpenSans_500Medium,
    color: Colours.white.$,
    fontSize: 16,
    marginVertical: 6,
    lineHeight: 24
  },
  title: {
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 32,
    color: Colours.lightGrey.$,
    lineHeight: 36,
    marginVertical: 6
  },
  hint: {
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 12,
    color: Colours.bright.$,
    marginVertical: 4,
    lineHeight: 24
  }
});
