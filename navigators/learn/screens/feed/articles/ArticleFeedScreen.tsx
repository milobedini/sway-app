import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Colours } from "../../../../../colours";
import { useAppSelector } from "../../../../../lib/redux/hooks";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";
import { mapPostsTileData, PostTile } from "../components";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colours.dark.$ },
  tabContainer: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export type ArticleFeedScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "articles"
>;
export const ArticleFeed = ({
  navigation,
  // eslint-disable-next-line
  route: { params },
}: ArticleFeedScreenProps): JSX.Element => {
  const articles = useAppSelector((state) => state.allArticles.articles);

  if (articles.length >= 1) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Animated.FlatList
          data={articles}
          keyExtractor={(post: { id: number }) => String(post.id)}
          contentInsetAdjustmentBehavior="automatic"
          numColumns={1}
          contentContainerStyle={styles.tabContainer}
          renderItem={(post) => (
            <PostTile
              article={true}
              key={post.item.id}
              post={mapPostsTileData(post.item)}
              onPress={
                (id) => {
                  navigation.navigate("articleShow", {
                    articleId: id,
                  });
                }
                // (id) => console.log(id)
              }
            />
          )}
          // {...rest}
        ></Animated.FlatList>
      </View>
    );
  }

  return <></>;
};
