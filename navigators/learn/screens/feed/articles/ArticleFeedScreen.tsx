import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Colours } from "../../../../../colours";
import { useAppSelector } from "../../../../../lib/redux/hooks";
import { mapPostsTileData, PostTile } from "../components";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colours.dark.$ },
  tabContainer: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
export const ArticleFeed = (): JSX.Element => {
  const articles = useAppSelector((state) => state.allArticles.articles);

  if (articles.length >= 1) {
    return (
      <View style={styles.container}>
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
            />
          )}
          // {...rest}
        ></Animated.FlatList>
      </View>
    );
  }

  return <></>;
};
