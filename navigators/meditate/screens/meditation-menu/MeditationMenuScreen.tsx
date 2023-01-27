import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { textStyles } from "../../../../components/text";
import meditationImage from "../../../home/screens/homepage/logo_black.png";
import { ThenThrow } from "../../../../lib/then-throw";
import { Colours } from "../../../../colours";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";
import { MostRecent } from "./components/MostRecent";
import { MostListened } from "./components/MostListened";
import { useAppSelector } from "../../../../lib/redux/hooks";
import { meditationGallery } from "./gallery/MeditationGallery";

export type MeditationMenuScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "menu"
>;
export const MeditationMenuScreen = ({
  navigation,
}: MeditationMenuScreenProps): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const images = meditationGallery;

  const styles = StyleSheet.create({
    container: { flex: 1 },
    button: {
      flexDirection: "row",
      width: 300,
      alignSelf: "center",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: height / 10,
      backgroundColor: "rgba(12, 21, 39, 0.5)",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colours.bright.$,
      height: 110,
    },
    image: {
      width: 120,
      height: 120,
    },
    imageTitle: {
      textAlign: "center",
      fontSize: 20,
      color: Colours.lightGrey.$,
      maxWidth: "50%",
    },
    lesserButtonsContainer: { flexDirection: "row" },
    lesserButton: {
      width: width / 2.2,
      height: 80,
      marginHorizontal: 8,
      backgroundColor: "rgba(12, 21, 39, 0.3)",
      marginTop: 40,
      marginBottom: 40,
    },
    lesserImageTitle: {
      fontSize: 16,
      textAlign: "center",
      color: Colours.lightGrey.$,
    },
  });

  const latestMeditation = useAppSelector(
    //@ts-expect-error redux naming issue
    (state) => state.latestMeditation.latestMeditation
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#0b3057", "#051c30"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Daily Med Button */}

      <TouchableOpacity
        onPress={() => {
          if (latestMeditation.id !== 0) {
            navigation.navigate("show", {
              meditationId: latestMeditation.id,
              image:
                meditationGallery[
                  Math.floor(Math.random() * meditationGallery.length)
                ],
            });
          } else {
            ThenThrow("Missing meditation id!");
          }
        }}
        style={[styles.button]}
        activeOpacity={0.4}
      >
        <Text style={[textStyles.title, styles.imageTitle]}>
          Your Daily Meditation
        </Text>
        <Image source={meditationImage} style={styles.image} />
      </TouchableOpacity>

      {/* Intro Course Button */}

      <View style={styles.lesserButtonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.lesserButton]}
          activeOpacity={0.4}
        >
          <Text style={[textStyles.title, styles.lesserImageTitle]}>
            Introductory Course
          </Text>
        </TouchableOpacity>

        {/* Categories - including all */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("categories");
          }}
          style={[styles.button, styles.lesserButton]}
          activeOpacity={0.4}
        >
          <Text style={[textStyles.title, styles.lesserImageTitle]}>
            Categories
          </Text>
        </TouchableOpacity>
      </View>

      {/* Most recently listened/added horizontal scroll */}
      <MostRecent
        onPress={() => navigation.navigate("list")}
        onTouch={(id: number, image: ImageSourcePropType) => {
          navigation.navigate("show", {
            meditationId: id,
            image: image,
          });
        }}
        images={images}
      />
      {/* Most listened to */}
      <MostListened
        onPress={(id: number, image: ImageSourcePropType) => {
          navigation.navigate("show", {
            meditationId: id,
            image: image,
          });
        }}
        images={images}
      />
    </ScrollView>
  );
};
