import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Text as MText, useAnimationState } from "moti";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, View } from "react-native";

import { Fonts } from "../../../../../fonts";
import { baseUrl } from "../../../../../lib/api/api";
import { LearnNavigatorParamsList } from "../../../LearnNavigatorParamsList";

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
  photo: string;
}

const { width, height } = Dimensions.get("screen");
const HEIGHT_OFFSET = height / 4;

export const ArticleShowScreen = ({
  route: {
    params: { articleId },
  },
}: ArticleShowScreenProps): JSX.Element => {
  const [article, setArticle] = useState<ArticleDataObject>();

  const scrollY = useRef(new Animated.Value(0)).current;
  const ref = useRef();

  const opacity = scrollY.interpolate({
    inputRange: [0, height - HEIGHT_OFFSET],
    outputRange: [1, 0],
  });

  const opacityReversed = scrollY.interpolate({
    inputRange: [0, height - HEIGHT_OFFSET],
    outputRange: [0, 1],
  });

  const scale = scrollY.interpolate({
    inputRange: [0, height - HEIGHT_OFFSET],
    outputRange: [1, 2],
    extrapolateLeft: "clamp",
  });

  const useFadeInDown = useAnimationState({
    from: {
      opacity: 0,
      translateY: 100,
    },
    to: {
      opacity: 1,
      translateY: 0,
    },
  });

  useEffect(() => {
    const getArticle = async (id: number) => {
      const res = await axios.get(`${baseUrl}/feed/${id}/`);
      setArticle(res.data);
    };
    getArticle(articleId);
    scrollY.addListener(({ value }) => {
      if (value >= height - HEIGHT_OFFSET) {
        useFadeInDown.transitionTo("to");

        return;
      }
      /* @ts-expect-error animation */
      useFadeInDown.transitionTo((state) => {
        if (state === "to") {
          return "from";
        }
      });

      /* @ts-expect-error animation */
      ref?.current?.setNativeProps({
        blurRadius: Math.round(value / 30),
      });

      return () => {
        scrollY.removeAllListeners();
      };
    });
  }, []);

  if (article) {
    return (
      <Animated.ScrollView
        snapToOffsets={[
          height - HEIGHT_OFFSET,
          height - HEIGHT_OFFSET + 1,
          height - HEIGHT_OFFSET + 2,
        ]}
        snapToEnd={false}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingTop: height - HEIGHT_OFFSET,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <View
          style={{
            width,
            height,
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
          }}
        >
          <Animated.Image
            ref={ref}
            source={{ uri: article.photo }}
            style={{ flex: 1, opacity, transform: [{ scale }] }}
          />
        </View>
        <View style={{ minHeight: height }}>
          <View
            style={{
              alignItems: "center",
              height: HEIGHT_OFFSET,
            }}
          >
            <Animated.Text
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                fontFamily: Fonts.OpenSans_700Bold,
                letterSpacing: 4,
                marginBottom: 10,
                color: "white",
                opacity,
                marginTop: -HEIGHT_OFFSET / 2,
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {new Date(article.created_at).toLocaleDateString("en-GB")}
            </Animated.Text>
            <Animated.Text
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                fontFamily: Fonts.OpenSans_700Bold,
                letterSpacing: 4,
                marginBottom: 10,
                color: "white",
                opacity,
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Written by {article.author.username}
            </Animated.Text>
            <View>
              <Animated.Text
                style={{
                  fontSize: 42,
                  fontFamily: Fonts.OpenSans_700Bold,
                  textTransform: "capitalize",
                  color: "white",
                  opacity,
                  marginHorizontal: 16,
                }}
                numberOfLines={3}
                adjustsFontSizeToFit
              >
                {article.title}
              </Animated.Text>
              <Animated.Text
                style={{
                  fontSize: 20,
                  fontFamily: Fonts.OpenSans_700Bold,
                  textTransform: "capitalize",
                  position: "absolute",
                  color: "white",
                  opacity: opacityReversed,
                  marginTop: HEIGHT_OFFSET * 0.8,
                  marginHorizontal: 16,
                }}
                numberOfLines={5}
                adjustsFontSizeToFit
              >
                {article.title}
              </Animated.Text>
            </View>
          </View>
          {/* @ts-expect-error regex */}
          {[...Array(article.text.match(/[^.!?]+[.!?]+/g).length).keys()].map(
            (index) => (
              <MText
                key={index}
                transition={{ delay: 50 * index }}
                state={useFadeInDown}
                style={{
                  marginBottom: 2,
                  fontSize: 16,
                  lineHeight: 24,
                  color: "white",
                  maxWidth: width - 20,
                  marginLeft: 16,
                }}
              >
                {/* @ts-expect-error regex */}
                {article.text.match(/[^.!?]+[.!?]+/g)[index]}
              </MText>
            )
          )}
        </View>
      </Animated.ScrollView>
    );
  }

  return <></>;
};
