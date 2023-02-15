/* eslint-disable react/no-unescaped-entities */
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { MotiText } from "@motify/components";

import { Sentence } from "./components/Sentence";
import { Fonts } from "../../../../fonts";

const sentence = [
  `Find stability in motion with Sway`,
  `Made with love by Milo Bedini`,
  `What is Sway?`,
];
const subtitles = [
  `- _ - _ - _ -`,
  `Please don't hesitate to contact me, even just for a chat.`,
  `. . . . . . . . . . . . . . .`,
];

export const AboutScreen = (): JSX.Element => {
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  let sentenceCount = 0;

  useEffect(() => {
    const changeSentence = () => {
      if (sentenceCount === 1) {
        setShowAbout(true);
        return;
      }
      timer.current = setTimeout(() => {
        // @ts-expect-error Timeout.
        setIndex((index) => {
          if (index === 2) {
            return;
          }
          sentenceCount = index;
          return (index + 1) % sentence.length;
        });
        changeSentence();
      }, 3000);
    };

    changeSentence();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: Constants.statusBarHeight,

      padding: 16,
    },
    paragraph: {
      color: "white",
      fontFamily: Fonts.OpenSans_400Regular,
      fontSize: 16,
      marginBottom: 16,
      lineHeight: 16 * 1.6,
    },
  });

  return (
    <View
      style={[
        styles.container,
        showAbout && { marginTop: Constants.statusBarHeight + 8 },
      ]}
    >
      <StatusBar style="light" />
      <Sentence
        text={sentence[index]}
        style={{
          fontSize: 20,
          fontFamily: Fonts.OpenSans_700Bold,
          color: "white",
        }}
        uppercase
      />
      <Sentence
        text={subtitles[index]}
        style={{
          fontSize: 14,
          fontFamily: Fonts.OpenSans_500Medium,
          color: "white",
          marginTop: 10,
          opacity: 0.7,
        }}
        uppercase
      />
      {showAbout ? (
        <ScrollView
          style={{ marginTop: 8, alignSelf: "flex-start" }}
          contentContainerStyle={{ marginTop: 8 }}
        >
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            delay={1500}
            exit={{ opacity: 0 }}
            style={styles.paragraph}
          >
            Welcome to Sway, a meditation app that helps you cultivate
            mindfulness and inner peace. Our approach draws on the teachings of
            Dzogchen, Zen, and primarily uses Vipassana (mindfulness)
            meditations with an emphasis on non-dualism. Sway is appropriate for
            both a secular Buddhist and a more traditional perspective.
          </MotiText>
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            delay={2000}
            exit={{ opacity: 0 }}
            style={styles.paragraph}
          >
            At Sway, we believe that meditation is a powerful tool for observing
            our thoughts and emotions, without getting lost in them or
            identifying with them. By learning to be present in the moment and
            cultivate inner stillness, we can find greater clarity, insight, and
            peace.
          </MotiText>
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            delay={2500}
            exit={{ opacity: 0 }}
            style={styles.paragraph}
          >
            In addition to these influences, we have a lesser interest in
            implementing some concepts from Stoicism (excluding its differing
            view on the self). We believe that Stoic practices like cultivating
            resilience, practicing gratitude, and accepting what we can't
            control can be useful complements to mindfulness meditation.
          </MotiText>
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            delay={3000}
            exit={{ opacity: 0 }}
            style={styles.paragraph}
          >
            Our guided meditations are designed to help you develop mindful
            awareness, compassion, and wisdom. Whether you're new to meditation
            or an experienced practitioner, our app can help you deepen your
            practice and find greater inner calm.
          </MotiText>
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            delay={3500}
            exit={{ opacity: 0 }}
            style={styles.paragraph}
          >
            With Sway, you'll have access to a variety of meditation practices,
            including breath awareness, body scan, loving-kindness, as well as
            all of the app's additional features. Thank you for choosing Sway as
            your meditation companion. We hope that our app can help you find
            greater peace, clarity, and well-being in your life.
          </MotiText>
        </ScrollView>
      ) : null}
    </View>
  );
};
