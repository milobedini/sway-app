import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NextButton } from '../../components/next-button'
import { TourScreen } from '../../components/tour-screen'
import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList'
import imageSource from '../../../../assets/hero_mob.png'

export type HeadlinesScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  'headlines'
>

export const HeadlinesScreen = ({
  navigation,
}: HeadlinesScreenProps): JSX.Element => {
  const onNext = () => {
    navigation.push('meditations'), [navigation]
  }

  return (
    <TourScreen
      pageNumber={1}
      smallStatusBarStyle="dark"
      imageSource={imageSource}
      title="Headlines screen"
      body="This is the body text for the headlines screen with some great content."
    >
      <NextButton onNext={onNext} />
    </TourScreen>
  )
}
