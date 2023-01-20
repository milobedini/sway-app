import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colours } from "../../../../../colours";
import { textStyles } from "../../../../../components/text";
import { Fonts } from "../../../../../fonts";
import { PostTileProps } from "./PostTileProps";

const styles = StyleSheet.create({
  postContainer: {
    borderBottomColor: Colours.darkGrey.$,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 30,
    paddingVertical: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  articleTopContainer: {
    flexDirection: "column",
  },
  usernameText: {
    fontFamily: Fonts.OpenSans_700Bold,
    color: Colours.bright.$,
    flexShrink: 0,
    marginLeft: 20,
  },
  usernameTextArticle: {
    paddingVertical: 8,
  },
  postTitle: {
    color: Colours.white.$,
    fontFamily: Fonts.OpenSans_700Bold,
    flexShrink: 1,
    fontSize: 16,
  },
  postTitleArticle: {
    fontSize: 24,
  },
  postText: {
    color: Colours.lightGrey.$,
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 12,
    marginBottom: 8,
  },
  postReplies: {
    color: Colours.white.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 12,
    marginTop: 8,
  },

  toggle: {
    color: Colours.darkGrey.$,
  },
});

export const PostTile = ({ post, article }: PostTileProps): JSX.Element => {
  const [active, setActive] = useState(false);

  return (
    <View style={styles.postContainer}>
      <View
        style={[styles.topContainer, article && styles.articleTopContainer]}
      >
        <Text style={[styles.postTitle, article && styles.postTitleArticle]}>
          {post?.title}
        </Text>
        {!article ? (
          <Text style={styles.usernameText}>{post?.author}</Text>
        ) : (
          <Text style={[styles.usernameText, styles.usernameTextArticle]}>
            Written by {post?.author}
          </Text>
        )}
      </View>
      {active || !article ? (
        <>
          {article && (
            <Text
              style={[textStyles.hint, styles.toggle]}
              onPress={() => setActive(!active)}
            >
              Collapse
            </Text>
          )}
          <Text style={styles.postText}>{post?.text}</Text>
          <Text style={styles.postReplies}>
            {post?.comments?.length} replies
          </Text>
          {article && (
            <Text
              style={[textStyles.hint, styles.toggle]}
              onPress={() => setActive(!active)}
            >
              Collapse
            </Text>
          )}
        </>
      ) : (
        <Text
          style={[textStyles.hint, styles.toggle]}
          onPress={() => setActive(!active)}
        >
          Expand
        </Text>
      )}
    </View>
  );
};
