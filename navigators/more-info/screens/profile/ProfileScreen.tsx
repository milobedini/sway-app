import { StyleSheet, Text, View } from "react-native";
import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
    color: Colours.lightGrey.$,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ProfileScreen = (): JSX.Element => (
  <View style={styles.container}>
    <Text style={textStyles.title}>Profile Screen</Text>
  </View>
);
