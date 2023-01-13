import { ComponentType } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlightProps,
} from 'react-native'
import { Colours } from '../../colours'
import { Fonts } from '../../fonts'

export type MiniButtonProps = TouchableHighlightProps &
  (
    | {
        title: string
      }
    | { component: ComponentType }
  )

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colours.white.$,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  title: {
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 14,
    color: Colours.dark.$,
    lineHeight: 16,
  },
})

export const MiniButton = ({
  style: styleProp,
  ...props
}: MiniButtonProps): JSX.Element => {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.container, styleProp]}
      {...props}
    >
      {'title' in props ? (
        <Text style={styles.title}>{props.title}</Text>
      ) : (
        props.component
      )}
    </Pressable>
  )
}
