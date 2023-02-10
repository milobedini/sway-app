import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import { Colours } from "../../../../../colours";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";
import { PostsList } from "../components";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colours.dark.$ },
});
export type CommunityFeedScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "community"
>;
export const CommunityFeedScreen = ({
  navigation,
  // eslint-disable-next-line
  route: { params },
}: CommunityFeedScreenProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <PostsList
        onPress={(id) => {
          navigation.navigate("threadShow", {
            threadId: id,
          });
        }}
      />
    </View>
  );
};
