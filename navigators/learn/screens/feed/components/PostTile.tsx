import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import { Colours } from "../../../../../colours";
import { textStyles } from "../../../../../components/text";
import { Fonts } from "../../../../../fonts";
import { timeSince } from "../../../../../lib/humanisers/date";
import { ThenThrow } from "../../../../../lib/then-throw";
import { PostTileProps } from "./PostTileProps";

const styles = StyleSheet.create({
  postContainer: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
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
  authorDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  authorAgoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  timeAgo: {
    fontSize: 10,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  comments: {
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: Colours.bright.$,
  },
  comment: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colours.darkGrey.$,
  },
  commentOwner: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
  },
  commentDate: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 10,
  },
  commentText: {
    color: Colours.lightGrey.$,
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 12,
  },
});

interface CommentData {
  id: number;
  owner: { username: string };
  created_at: string;
  text: string;
}

export const PostTile = ({
  post,
  article,
  onPress,
}: PostTileProps): JSX.Element => {
  const [active, setActive] = useState(false);

  if (post) {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => {
          return onPress(post.id ?? ThenThrow("Missing post id"));
        }}
      >
        <View
          style={[styles.topContainer, article && styles.articleTopContainer]}
        >
          <Text style={[styles.postTitle, article && styles.postTitleArticle]}>
            {post?.title}
          </Text>
          {!article ? (
            <TouchableOpacity style={styles.authorAgoContainer}>
              <Text style={styles.usernameText}>{post?.author}</Text>
              <Text
                style={[
                  styles.usernameText,
                  styles.usernameTextArticle,
                  styles.timeAgo,
                ]}
              >
                Posted {timeSince(new Date(String(post.created_at)))} ago
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.authorDateContainer}>
              <Text style={[styles.usernameText, styles.usernameTextArticle]}>
                Written by {post?.author}
              </Text>
              <Text style={[styles.usernameText, styles.usernameTextArticle]}>
                {/* Posted {timeSince(new Date(post.created_at))} ago */}
                {new Date(String(post.created_at)).toLocaleDateString("en-GB")}
              </Text>
            </View>
          )}
        </View>
        {active || !article ? (
          <>
            {article && (
              <Text
                style={[textStyles.hint, styles.toggle]}
                // onPress={() => setActive(!active)}
                // onPress={() => onPress(post.id)}
              >
                Collapse
              </Text>
            )}
            <Text style={styles.postText}>{post?.text}</Text>
            <Text style={styles.postReplies} onPress={() => setActive(!active)}>
              {post?.comments?.length} replies{" "}
              {!active ? (
                <MaterialCommunityIcons
                  name="expand-all"
                  size={14}
                  color={Colours.bright.$}
                ></MaterialCommunityIcons>
              ) : (
                <Feather
                  name="minimize-2"
                  size={14}
                  color={Colours.errorDark.$}
                ></Feather>
              )}
            </Text>
            {article && (
              <Text
                style={[textStyles.hint, styles.toggle]}
                // onPress={() => setActive(!active)}
                // onPress={() => onPress(post.id)}
              >
                Collapse
              </Text>
            )}
          </>
        ) : null}

        {/* Map comments below */}
        {active && !article ? (
          <View style={styles.comments}>
            {post?.comments?.map((comment: CommentData) => (
              <View style={styles.comment} key={comment.id}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentOwner}>
                    {comment.owner.username}
                  </Text>
                  <Text style={styles.commentDate}>
                    {timeSince(new Date(comment.created_at))} ago
                  </Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
            {/* // Post comment here */}
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }
  return <></>;
};
