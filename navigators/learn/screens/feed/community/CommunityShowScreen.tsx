import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FontAwesome, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { baseUrl } from "../../../../../lib/api/api";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";
import { Fonts } from "../../../../../fonts";
import { Colours } from "../../../../../colours";
import { CommentDataType, Comments } from "./components/Comments";
import { FeaturedArticles } from "./components/FeaturedArticles";
import { NewComment } from "./components/NewComment";
import { ThreadDetails } from "./components/ThreadDetails";

export type CommunityShowScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "threadShow"
>;
export interface ThreadDataObject {
  id: number;
  comments: CommentDataType[];
  author: { username: string };
  created_at: string;
  title: string;
  views: number;
  text: string;
  photo: string;
}

const styles = StyleSheet.create({
  bottomActions: {
    height: 80,
    backgroundColor: Colours.dark.$,
    borderTopWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  featuredTitle: {
    color: "white",
    fontSize: 24,
    fontFamily: Fonts.OpenSans_700Bold,
    marginBottom: 20,
  },
  featuredImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginRight: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 32,
    fontFamily: Fonts.OpenSans_700Bold,
    marginTop: 14,
    marginBottom: 30,
    color: "white",
  },
  paragraph: {
    color: "white",
    marginBottom: 10,
    fontFamily: Fonts.OpenSans_400Regular,
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
  icon: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
export const CommunityShowScreen = ({
  route: {
    params: { threadId },
  },
  navigation,
}: CommunityShowScreenProps): JSX.Element => {
  const [thread, setThread] = useState<ThreadDataObject>();
  const [visible, setVisible] = useState(false);
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    const getThread = async (id: number) => {
      const res = await axios.get(`${baseUrl}/feed/${id}/`);
      setThread(res.data);
      setCommented(false);
    };
    getThread(threadId);
  }, [commented]);

  if (thread) {
    return (
      <SafeAreaView>
        <FlatList
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 20 }}
          data={[1]}
          renderItem={() => (
            <>
              <ThreadDetails thread={thread} />
              <View>
                <Comments threadId={threadId} commented={commented} />
              </View>
              <FeaturedArticles
                onPress={(id: number) =>
                  navigation.navigate("articleShow", {
                    articleId: id,
                  })
                }
              />
            </>
          )}
        >
          <ThreadDetails thread={thread} />
          <View>
            <Comments threadId={threadId} commented={commented} />
          </View>

          <FeaturedArticles
            onPress={(id: number) =>
              navigation.navigate("articleShow", {
                articleId: id,
              })
            }
          />
        </FlatList>

        <View
          style={[
            styles.bottomActions,
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 20,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              name="adjust"
              size={24}
              color="white"
              style={{ marginHorizontal: 10 }}
            />
            <Text style={{ color: "white" }}>{thread.views}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.icon]}>
              <AntDesign
                name="back"
                size={24}
                color="white"
                onPress={() => navigation.navigate("community")}
              />
            </View>
            <View style={[styles.icon]}>
              <FontAwesome
                name="comment-o"
                size={24}
                color={Colours.bright.$}
                onPress={() => {
                  setVisible(true);
                }}
              />
            </View>
            <View style={[styles.icon]}>
              <Ionicons name="create-outline" size={24} color="white" />
            </View>
          </View>
        </View>
        <NewComment
          threadId={threadId}
          visible={visible}
          setVisible={setVisible}
          setCommented={setCommented}
        />
      </SafeAreaView>
    );
  }
  return <></>;
};
