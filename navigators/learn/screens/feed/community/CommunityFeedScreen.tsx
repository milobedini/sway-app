import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import { Colours } from "../../../../../colours";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";
import { PostsList } from "../components";
import { NewThread } from "./components/NewThread";

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
  const [visible, setVisible] = useState(false);
  const [posted, setPosted] = useState(false);
  const { right } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <AntDesign
        name="pluscircleo"
        size={24}
        color={Colours.bright.$}
        style={{
          position: "absolute",
          right: right + 22,
          top: 22,
          zIndex: 999,
        }}
        onPress={() => {
          setVisible(true);
        }}
      />
      <PostsList
        onPress={(id) => {
          navigation.navigate("threadShow", {
            threadId: id,
          });
        }}
        posted={posted}
      />
      <NewThread
        visible={visible}
        setVisible={setVisible}
        setPosted={setPosted}
      />
    </View>
  );
};
