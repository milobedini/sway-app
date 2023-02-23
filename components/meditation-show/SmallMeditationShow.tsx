import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";
import { baseUrl } from "../../lib/api/api";
import { HorizontalRule } from "../horizontal-rule";
import { PlayIcon } from "../icons";
import { MeditationPlay } from "../meditation-play/MeditationPlay";
import { MeditationTileTags } from "../meditation-tile-tags";
import { PageLoading } from "../page-loading";
import { designStyles } from "../text";

const styles = StyleSheet.create({
  container: {},
  content: { alignItems: "stretch", marginTop: 50, flex: 1 },
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
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();

  // @ts-expect-error image.
  const { image }: string | undefined | ImageSourcePropType = route.params;
  // const image = (route.params as { image: string }).image;

  useEffect(() => {
    const getMeditation = async (id: number) => {
      const res = await axios.get(`${baseUrl}/meditations/${id}/`);
      setMeditation(res.data);
    };

    getMeditation(meditationId);
  }, []);

  if (meditation && !modalVisible) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <StatusBar style="light" />
        <SafeAreaView edges={["top", "bottom"]}>
          {/* Below will launch audio player when pressed */}
          <Image source={image} style={styles.heroImage} />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ alignItems: "center" }}
          >
            <PlayIcon fill={Colours.bright.$} />
          </TouchableOpacity>
          <View style={styles.card}>
            <Text style={[styles.title, styles.space]}>{meditation.name}</Text>
            <HorizontalRule color={Colours.bright.$} style={styles.divider} />
            <MeditationTileTags
              style={[styles.tags, styles.space]}
              meditation={meditation}
              colour={Colours.bright.$}
            />
            <Text style={[designStyles.body]}>{meditation?.description}</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
  if (meditation && modalVisible) {
    return (
      <MeditationPlay
        onPress={() => setModalVisible(false)}
        meditation={meditation}
        image={image}
      />
    );
  }
  return <PageLoading marginBottom={0} />;
};
