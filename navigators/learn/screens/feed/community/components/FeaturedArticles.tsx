import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Fonts } from "../../../../../../fonts";
import { useAppSelector } from "../../../../../../lib/redux/hooks";

const styles = StyleSheet.create({
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

  paragraph: {
    color: "white",
    marginBottom: 10,
    fontFamily: Fonts.OpenSans_400Regular,
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
});
type FeaturedArticlesProps = {
  onPress: (id: number) => void;
};
export const FeaturedArticles = ({
  onPress,
}: FeaturedArticlesProps): JSX.Element => {
  //   BELOW TO BECOME FEATURED ARTICLES
  const featuredArticles = [
    ...useAppSelector((state) => state.allArticles.articles),
  ]
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 2);

  return (
    <View style={{ marginTop: 20, marginBottom: 40 }}>
      <Text style={[styles.featuredTitle]}>Featured Articles</Text>

      {featuredArticles.map((article) => (
        <TouchableOpacity
          key={article.id}
          style={{
            flexDirection: "row",
            flex: 1,
            marginBottom: 10,
          }}
          onPress={() => onPress(article.id)}
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
        </TouchableOpacity>
      ))}
    </View>
  );
};
