import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollViewProps, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { baseUrl } from "../../../../../lib/api/api";
import { PostTile } from "./PostTile";
import { mapPostsTileData, PostListResponseDataItem } from "./mapPostsTileData";

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export type PostsListProps = Omit<ScrollViewProps, "children"> & {
  //
};

export const PostsList = ({ ...rest }: PostsListProps): JSX.Element => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/feed/`);
        setPosts(
          res.data.filter(
            (post: PostListResponseDataItem) => post.category === "Threads"
          )
        );
      } catch (err) {
        return err;
      }
    };
    getPosts();

    // Note to delete in [] below
  }, []);

  if (posts.length >= 1) {
    return (
      <Animated.FlatList
        data={posts}
        keyExtractor={(post: { id: number }) => String(post.id)}
        contentInsetAdjustmentBehavior="automatic"
        numColumns={1}
        contentContainerStyle={styles.tabContainer}
        renderItem={(post) => (
          <PostTile
            key={post.item.id}
            post={mapPostsTileData(post.item)}
            article={false}
          />
        )}
        {...rest}
      ></Animated.FlatList>
    );
  }
  return <></>;
};
