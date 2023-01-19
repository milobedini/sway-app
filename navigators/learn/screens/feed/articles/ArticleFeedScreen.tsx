import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
});
export const ArticleFeed = (): JSX.Element => (
  <View style={styles.container}>
    <Text>Article Feed</Text>
  </View>
);
