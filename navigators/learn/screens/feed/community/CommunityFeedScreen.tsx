import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import { Colours } from "../../../../../colours";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";
import { PostsList } from "../components";
import { getUserId } from "../../../../../lib/auth/auth";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: Colours.dark.$ },
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
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const checkSignedIn = async () => {
      const userId = await getUserId();
      if (userId) {
        setSignedIn(true);
      }
    };
    checkSignedIn();
  }, [signedIn]);

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
