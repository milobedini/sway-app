import {
  Pressable,
  StyleSheet,
  Text,
  TextProps,
  TouchableHighlightProps,
} from 'react-native'
import { Colours } from '../../colours'
import { Fonts } from '../../fonts'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colours.bright.$,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
  },

  destructive: {
    backgroundColor: Colours.errorDark.$,
    color: Colours.white.$,
  },
  title: {
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
    color: Colours.dark.$,
    lineHeight: 24,
  },
  darkTitle: {
    color: Colours.bright.$,
  },
  icon: {
    marginLeft: 12,
  },
})

export type PrimaryButtonProps = TouchableHighlightProps & {
  title: string
  titleStyle?: TextProps['style']
  destructive?: boolean
  dark?: boolean
}
export const PrimaryButton = ({
  title,
  titleStyle,
  style: styleProp,
  destructive = false,
  dark = false,
  ...props
}: PrimaryButtonProps): JSX.Element => (
  <Pressable
    accessibilityRole="button"
    style={[styles.container, destructive && styles.destructive, styleProp]}
    {...props}
  >
    <Text
      style={[
        styles.title,
        dark && styles.darkTitle,
        destructive && styles.destructive,
        titleStyle,
      ]}
    >
      {title}
    </Text>
  </Pressable>
)
