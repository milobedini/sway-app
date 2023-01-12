import { HeaderButtonProps } from '@react-navigation/elements'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { Colours } from '../../../../colours'
import { MiniButton } from '../../../../components/mini-button'
import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList'

const styles = StyleSheet.create({
  container: {
    marginRight: 24,
    backgroundColor: Colours.bright.$,
  },
})

export const HeaderSkipButton = (props: HeaderButtonProps): JSX.Element => {
  const navigation = useNavigation<NavigationProp<WelcomeNavigatorParamsList>>()
  const onSkip = useCallback(() => navigation.navigate('signIn'), [navigation])

  return (
    <MiniButton
      title="Skip"
      {...props}
      style={styles.container}
      onPress={onSkip}
    />
  )
}
