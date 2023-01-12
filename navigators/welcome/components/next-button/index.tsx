import { StyleSheet } from 'react-native'
import { Colours } from '../../../../colours'
import { PrimaryButton } from '../../../../components/primary-button'

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colours.bright.$,
  },
})

export type NextButtonProps = {
  onNext: () => void
  title?: string
}

export const NextButton = ({
  onNext,
  title = 'Next',
}: NextButtonProps): JSX.Element => (
  <PrimaryButton title={title} style={styles.button} onPress={onNext} />
)
