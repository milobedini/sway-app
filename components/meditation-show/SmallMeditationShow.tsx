import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";
import { baseUrl } from "../../lib/api/api";
import { HorizontalRule } from "../horizontal-rule";
import { MeditationTileTags } from "../meditation-tile-tags";
import { textStyles } from "../text";
import medTile from "./MedTile2.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
  },
  content: { alignItems: "stretch", marginTop: 50 },
  heroImage: {
    width: "100%",
    maxHeight: 250,
    aspectRatio: 1 / 1,
    alignSelf: "center",
  },
  card: {
    padding: 23,
    borderRadius: 20,
  },
  title: {
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 28,
    color: Colours.bright.$,
    lineHeight: 34,
    letterSpacing: -0.75,
  },
  space: {
    marginBottom: 9,
  },
  divider: {
    marginVertical: 24,
  },
  tags: {
    // marginTop: -10,
  },
});

export type SmallMeditationShowProps = {
  meditationId: number;
};

interface MeditationDataObject {
  meditationId: number;
  name: string;
  description: string;
}

export const SmallMeditationShow = ({
  meditationId,
}: SmallMeditationShowProps): JSX.Element => {
  const [meditation, setMeditation] = useState<MeditationDataObject>();

  useEffect(() => {
    const getMeditation = async (id: number) => {
      const res = await axios.get(`${baseUrl}/meditations/${id}/`);
      setMeditation(res.data);
    };

    getMeditation(meditationId);
  }, []);

  if (meditation) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <StatusBar style="auto" />
        <SafeAreaView edges={["top", "bottom"]}>
          {/* Below will launch audio player when pressed */}
          <Image source={medTile} style={styles.heroImage} />
          <View style={styles.card}>
            <Text style={[styles.title, styles.space]}>{meditation.name}</Text>
            <HorizontalRule color={Colours.bright.$} style={styles.divider} />
            <MeditationTileTags
              style={[styles.tags, styles.space]}
              meditation={meditation}
            />
            <Text style={[textStyles.body]}>{meditation?.description}</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
  return <View style={{ backgroundColor: Colours.dark.$, flex: 1 }}></View>;
};
