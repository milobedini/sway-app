import { StyleSheet, Text, View } from "react-native";

import { Colours } from "../../../../../colours";
import { Fonts } from "../../../../../fonts";
import { PostTileProps } from "./PostTileProps";

const styles = StyleSheet.create({
  postContainer: {
    borderBottomColor: Colours.darkGrey.$,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    paddingVertical: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  usernameText: {
    fontFamily: Fonts.OpenSans_700Bold,
    color: Colours.bright.$,
    flexShrink: 0,
    marginLeft: 20,
  },
  postTitle: {
    color: Colours.white.$,
    fontFamily: Fonts.OpenSans_700Bold,
    flexShrink: 1,
  },
  postText: {
    color: Colours.lightGrey.$,
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 12,
    marginBottom: 8,
  },
});

export const PostTile = ({ post }: PostTileProps): JSX.Element => (
  <View style={styles.postContainer}>
    <View style={styles.topContainer}>
      <Text style={styles.postTitle}>{post?.title}</Text>
      <Text style={styles.usernameText}>{post?.author}</Text>
    </View>

    <Text style={styles.postText}>{post?.text}</Text>
  </View>
);
