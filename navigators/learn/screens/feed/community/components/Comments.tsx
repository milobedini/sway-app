import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { Colours } from "../../../../../../colours";
import { Fonts } from "../../../../../../fonts";
import { baseUrl, secureDelete } from "../../../../../../lib/api/api";
import { timeSince } from "../../../../../../lib/humanisers/date";
import { getUserId } from "../../../../../../lib/auth/auth";
import { useToast } from "../../../../../../components/toast/useToast";

const styles = StyleSheet.create({
  featuredTitle: {
    color: "white",
    fontSize: 24,
    fontFamily: Fonts.OpenSans_700Bold,
    lineHeight: 24 * 1.2,
  },

  paragraph: {
    color: "white",
    marginBottom: 16,
    marginTop: 16,
    fontFamily: Fonts.OpenSans_400Regular,
    fontSize: 16,
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
  const [userId, setUserId] = useState(0);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const id = await getUserId();
      setUserId(Number(id));
    };

    getUser();
  }, [userId]);

  useEffect(() => {
    const getThreadComments = async () => {
      const res = await axios.get(`${baseUrl}/feed/${threadId}/`);
      setComments(res.data.comments);
    };

    getThreadComments();
  }, [commented, deleted]);

  // @ts-expect-error swipe.
  const renderItem = ({ item, index }, onClick) => {
    // @ts-expect-error swipe.
    const renderRightActions = (progress, dragX, onClick) => {
      if (item.owner.id === userId) {
        return (
          <AntDesign
            name="delete"
            size={24}
            color="red"
            onPress={onClick}
            style={{ paddingTop: 16 }}
          />
        );
      }
      return;
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, onClick)
        }
      >
        <View
          key={`block-${index}`}
          style={[
            {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "white",
              paddingTop: 4,
            },
          ]}
        >
          {item.owner.id === userId ? (
            <Entypo
              name="triangle-left"
              size={24}
              color="red"
              style={{ position: "absolute", right: 0, top: 16 }}
            />
          ) : null}

          <Text style={styles.paragraph} key={item.id}>
            {"\n"}
            {item.text} {"\n"}
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
                {item.owner.username}
              </Text>

              <Text style={[styles.paragraph, { color: Colours.bright.$ }]}>
                {timeSince(new Date(item.created_at))} ago
              </Text>
            </View>
          </Text>
        </View>
      </Swipeable>
    );
  };

  // @ts-expect-error swipe.
  const deleteComment = async ({ item }) => {
    const config = await secureDelete(`${baseUrl}/comments/${item.id}/`);
    try {
      await axios(config);
      setDeleted(true);

      useToast(Platform.OS, "removeComment");
      setDeleted(false);
    } catch (err) {
      return err;
    }
  };

  if (comments.length > 0) {
    return (
      <>
        <Text style={[styles.featuredTitle, { marginTop: 48, fontSize: 24 }]}>
          Comments ({comments.length})
        </Text>
        <FlatList
          data={comments}
          renderItem={(v) =>
            renderItem(v, () => {
              // console.log("PRESSED", v);
              deleteComment(v);
            })
          }
          keyExtractor={(item: { id: number }) => String(item.id)}
        ></FlatList>
      </>
    );
  }
  return <></>;
};
