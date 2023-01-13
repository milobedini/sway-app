import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colours } from '../../../../colours'
import { textStyles } from '../../../../components/text'
import { HomeNavigatorParamsList } from '../../HomeNavigatorParamsList'

export type HomeScreenProps = StackScreenProps<
  HomeNavigatorParamsList,
  'homepage'
>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
    alignItems: 'center',
  },
})

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.title}>Home Screen</Text>
    </SafeAreaView>
  )
}
