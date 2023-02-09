import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { baseUrl } from "../../../../../lib/api/api";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";
import { Fonts } from "../../../../../fonts";
import { Colours } from "../../../../../colours";
import { timeSince } from "../../../../../lib/humanisers/date";
import { useAppSelector } from "../../../../../lib/redux/hooks";

export type CommunityShowScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "threadShow"
>;
interface ThreadDataObject {
  id: number;
  comments: [];
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
  //   BELOW TO BECOME FEATURED ARTICLES
  const featuredArticles = [
    ...useAppSelector((state) => state.allArticles.articles),
  ]
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 2);

  useEffect(() => {
    const getThread = async (id: number) => {
      const res = await axios.get(`${baseUrl}/feed/${id}/`);
      setThread(res.data);
    };
    getThread(threadId);
  }, []);

  if (thread) {
    return (
      <SafeAreaView>
        <ScrollView
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 20 }}
        >
          <Text style={styles.heading}>{thread.title}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.paragraph, { color: Colours.bright.$ }]}>
              {thread.author.username}
            </Text>
            <Text style={[styles.paragraph, { color: Colours.bright.$ }]}>
              {timeSince(new Date(thread.created_at))} ago
            </Text>
          </View>

          <View>
            <Text style={styles.paragraph}>{thread.text}</Text>
            <Text
              style={[styles.featuredTitle, { marginTop: 50, fontSize: 20 }]}
            >
              Comments ({thread.comments.length})
            </Text>

            {thread.comments.map(
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
                      <Text
                        style={[styles.paragraph, { color: Colours.bright.$ }]}
                      >
                        {comment.owner.username}
                      </Text>
                      <Text
                        style={[styles.paragraph, { color: Colours.bright.$ }]}
                      >
                        {timeSince(new Date(comment.created_at))} ago
                      </Text>
                    </View>
                  </Text>
                </View>
              )
            )}
          </View>

          <View style={{ marginTop: 20, marginBottom: 40 }}>
            <Text style={[styles.featuredTitle]}>Featured Articles</Text>

            {featuredArticles.map((article) => (
              <View
                key={article.id}
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{
                    uri: article.photo,
                  }}
                  style={styles.featuredImage}
                ></Image>
                <Text style={styles.paragraph} numberOfLines={2}>
                  {article.title}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

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
                //   onPress={() => navigation.navigate('newComment')}
                onPress={() => {
                  navigation.navigate("newComment", {
                    threadId: Number(threadId),
                  });
                }}
              />
            </View>
            <View style={[styles.icon]}>
              <Ionicons name="create-outline" size={24} color="white" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return <></>;
};
