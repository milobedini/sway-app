import { StackScreenProps } from "@react-navigation/stack";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { HomeNavigatorParamsList } from "../../HomeNavigatorParamsList";
import meditateImage from "./med.png";
import communityImage from "./book.png";
import notesImage from "./cloud.png";
import timerImage from "./timer.png";
import progressImage from "./progress.png";
import backgroundImage from "./background.png";
import backgroundWeb from "./background_web.png";
export type HomeScreenProps = StackScreenProps<
  HomeNavigatorParamsList,
  "homepage"
>;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingHorizontal: 8,
  },
  image: {
    width: 60,
    height: 60,
  },
  imageTitle: {
    marginTop: 10,
    textAlign: "center",
    color: Colours.lightGrey.$,
  },
});

export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <ImageBackground
        style={[styles.background, { height: height }]}
        source={width > 480 ? backgroundWeb : backgroundImage}
      >
        <View>
          <View style={styles.content}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  navigation
                    .getParent()
                    ?.navigate("meditate", { screen: "list", params: {} })
                }
              >
                <View style={styles.imageContainer}>
                  <Image source={meditateImage} style={styles.image} />
                  <Text style={[textStyles.body, styles.imageTitle]}>
                    Meditate
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("navigating")}>
                <View style={styles.imageContainer}>
                  <Image source={communityImage} style={styles.image} />
                  <Text style={[textStyles.body, styles.imageTitle]}>
                    Community
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => console.log("navigating")}>
                <View style={styles.imageContainer}>
                  <Image source={notesImage} style={styles.image} />
                  <Text style={[textStyles.body, styles.imageTitle]}>
                    Notes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("navigating")}>
                <View style={styles.imageContainer}>
                  <Image source={timerImage} style={styles.image} />
                  <Text style={[textStyles.body, styles.imageTitle]}>
                    Timer
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("navigating")}>
                <View style={styles.imageContainer}>
                  <Image source={progressImage} style={styles.image} />
                  <Text style={[textStyles.body, styles.imageTitle]}>
                    Profile
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
