import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollViewProps, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { baseUrl } from "../../../../../lib/api/api";
import { PostTile } from "./PostTile";
import { mapPostsTileData, PostListResponseDataItem } from "./mapPostsTileData";
import { NewThread } from "../community/components/NewThread";
import { Colours } from "../../../../../colours";

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export type PostsListProps = Omit<ScrollViewProps, "children"> & {
  onPress: (id: number) => void;
};

export const PostsList = ({
  onPress,
  ...rest
}: PostsListProps): JSX.Element => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [posted, setPosted] = useState(false);
  const [deleted, setDeleted] = useState(false);

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
  }, [deleted, posted]);

  if (posts.length >= 1) {
    return (
      <>
        <AntDesign
          name="pluscircleo"
          size={24}
          color={Colours.bright.$}
          style={{
            position: "absolute",
            right: 22,
            top: 22,
            zIndex: 999,
          }}
          onPress={() => {
            setVisible(true);
          }}
        />
        <NewThread
          visible={visible}
          setVisible={setVisible}
          setPosted={setPosted}
        />

        <Animated.FlatList
          data={posts}
          keyExtractor={(post: { id: number }) => String(post.id)}
          contentInsetAdjustmentBehavior="automatic"
          numColumns={1}
          contentContainerStyle={styles.tabContainer}
          showsVerticalScrollIndicator={false}
          renderItem={(post) => (
            <PostTile
              key={post.item.id}
              post={mapPostsTileData(post.item)}
              article={false}
              onPress={() => {
                onPress(post.item.id);
              }}
              deleted={deleted}
              setDeleted={setDeleted}
            />
          )}
          {...rest}
        ></Animated.FlatList>
      </>
    );
  }
  return <></>;
};
