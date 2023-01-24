import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../../../../colours";
import { Fonts } from "../../../../../fonts";
import { baseUrl } from "../../../../../lib/api/api";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    color: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
    paddingVertical: 8,
  },
  headerText: { color: Colours.bright.$, fontFamily: Fonts.OpenSans_700Bold },
  title: {
    color: "white",
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 28,
    textAlign: "left",
    marginHorizontal: "5%",
  },
  views: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 12,
    textAlign: "right",
    marginRight: "10%",
    marginTop: 4,
  },
  bodyContainer: {
    marginTop: 12,
    borderTopColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  body: {
    marginTop: 12,
    color: Colours.lightGrey.$,
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 18,
    marginHorizontal: "5%",
    textAlign: "justify",
  },
});

export type ArticleShowScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "show"
>;

interface ArticleDataObject {
  id: number;
  comments: [];
  author: { username: string };
  created_at: string;
  title: string;
  views: number;
  text: string;
}

export const ArticleShowScreen = ({
  route: {
    params: { articleId },
  },
}: ArticleShowScreenProps): JSX.Element => {
  const [article, setArticle] = useState<ArticleDataObject>();

  useEffect(() => {
    const getArticle = async (id: number) => {
      const res = await axios.get(`${baseUrl}/feed/${id}/`);
      setArticle(res.data);
    };
    getArticle(articleId);
  }, [article?.id]);

  if (article) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{article.author.username}</Text>
          <Text style={styles.headerText}>
            {new Date(article.created_at).toLocaleDateString("en-GB")}
          </Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <ScrollView style={styles.bodyContainer}>
          <Text style={styles.views}>{article.views} Views</Text>
          <Text style={styles.body}>{article.text}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return <></>;
};
