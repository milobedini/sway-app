import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const AboutScreen = (): JSX.Element => (
  <View style={styles.container}>
    <StatusBar style="light" />
    <Text style={[textStyles.title]}>About Page</Text>
  </View>
);
