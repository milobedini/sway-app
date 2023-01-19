import { StyleSheet, View } from "react-native";

import { Colours } from "../../../../../colours";
import { PostsList } from "../components";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colours.dark.$ },
});
export const CommunityFeed = (): JSX.Element => (
  <View style={styles.container}>
    <PostsList />
  </View>
);
