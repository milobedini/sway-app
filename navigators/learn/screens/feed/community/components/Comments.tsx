import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colours } from "../../../../../../colours";
import { Fonts } from "../../../../../../fonts";
import { baseUrl } from "../../../../../../lib/api/api";
import { timeSince } from "../../../../../../lib/humanisers/date";

const styles = StyleSheet.create({
  featuredTitle: {
    color: "white",
    fontSize: 24,
    fontFamily: Fonts.OpenSans_700Bold,
    marginBottom: 20,
  },

  paragraph: {
    color: "white",
    marginBottom: 10,
    fontFamily: Fonts.OpenSans_400Regular,
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
});

export type CommentDataType = {
  id: number;
  text: string;
  created_at: string;
  owner: { username: string };
};

type CommentsProps = {
  commented: boolean;
  threadId: number;
};

export const Comments = ({
  commented,
  threadId,
}: CommentsProps): JSX.Element => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getThreadComments = async () => {
      const res = await axios.get(`${baseUrl}/feed/${threadId}/`);
      setComments(res.data.comments);
    };
    getThreadComments();
  }, [commented]);
  return (
    <>
      <Text style={[styles.featuredTitle, { marginTop: 50, fontSize: 20 }]}>
        Comments ({comments.length})
      </Text>

      {comments.map(
        (
          comment: {
            id: number;
            text: string;
            owner: { username: string };
            created_at: string;
          },
          index
        ) => (
          <View
            key={`block-${index}`}
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "white",
            }}
          >
            <Text style={styles.paragraph} key={comment.id}>
              {"\n"}
              {comment.text} {"\n"}
              <View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  },
                ]}
              >
                <Text style={[styles.paragraph, { color: Colours.bright.$ }]}>
                  {comment.owner.username}
                </Text>
                <Text style={[styles.paragraph, { color: Colours.bright.$ }]}>
                  {timeSince(new Date(comment.created_at))} ago
                </Text>
              </View>
            </Text>
          </View>
        )
      )}
    </>
  );
};
