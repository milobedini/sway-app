import { StyleSheet, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { Colours } from '../../../../colours'
import { Fonts } from '../../../../fonts'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
    marginHorizontal: 7,
  },
})

export type ProgressProps = {
  pageNumber: number
}

export const Progress = ({ pageNumber }: ProgressProps): JSX.Element => {
  if (pageNumber === 1) {
    return (
      <View style={styles.container}>
        <Svg width={45} height={11} viewBox="0 0 45 11" fill="none">
          <Circle cx={5.25} cy={5.25} r={5.25} fill="#004E34" />
          <Circle cx={22.5} cy={5.25} r={5.25} fill="#7EC1AC" />
          <Circle cx={39.75} cy={5.25} r={5.25} fill="#7EC1AC" />
        </Svg>
      </View>
    )
  }
  if (pageNumber === 2) {
    return (
      <View style={styles.container}>
        <Svg width={45} height={11} viewBox="0 0 45 11" fill="none">
          <Circle cx={5.25} cy={5.25} r={5.25} fill="#7EC1AC" />
          <Circle cx={22.5} cy={5.25} r={5.25} fill="#004E34" />
          <Circle cx={39.75} cy={5.25} r={5.25} fill="#7EC1AC" />
        </Svg>
      </View>
    )
  }
  if (pageNumber === 3) {
    return (
      <View style={styles.container}>
        <Svg width={45} height={11} viewBox="0 0 45 11" fill="none">
          <Circle cx={5.25} cy={5.25} r={5.25} fill="#7EC1AC" />
          <Circle cx={22.5} cy={5.25} r={5.25} fill="#7EC1AC" />
          <Circle cx={39.75} cy={5.25} r={5.25} fill="#004E34" />
        </Svg>
      </View>
    )
  }
  return <></>
}
