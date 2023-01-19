import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import { useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { baseUrl, secureGet } from "../../../../lib/api/api";
import { getUserId } from "../../../../lib/auth/auth";
import { setMeditations } from "../../../../lib/redux/actions/meditationsActions";
import { setProfile } from "../../../../lib/redux/actions/profileActions";
import { HomeNavigatorParamsList } from "../../HomeNavigatorParamsList";
import backgroundImage from "./background.png";
import backgroundWeb from "./background_web.png";
import meditationImage from "./logo_black.png";
export type HomeScreenProps = StackScreenProps<
  HomeNavigatorParamsList,
  "homepage"
>;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colours.dark.$ },
  background: { flex: 0.5, justifyContent: "center", textAlign: "center" },
  sway: { textAlign: "center" },
  button: {
    flexDirection: "row",
    width: 300,
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "10%",
    backgroundColor: "rgba(12, 21, 39, 0.6)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colours.bright.$,
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
});

/* 
WIREFRAME

Should link to the latest/daily meditation only.

*/
// eslint-disable-next-line
export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const meditations = useSelector((state) => state.allMeditations.meditations);
  const user = useSelector((state) => state.userProfile.profile);

  const dispatch = useDispatch();

  // Refactor all of these. Then just call a setup app content function.

  const getMeditations = async () => {
    const res = await axios.get(`${baseUrl}/meditations/`);
    dispatch(setMeditations(res.data));
  };

  const getProfile = async () => {
    const config = await secureGet(
      `${baseUrl}/auth/profile/${await getUserId()}/`
    );
    try {
      const res = await axios(config);
      dispatch(setProfile(res.data));
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (!meditations || meditations.length === 0) {
      getMeditations();
    }
  }, [meditations]);

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, [meditations]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background, { height: height }]}
        source={width > 480 ? backgroundWeb : backgroundImage}
        onLoad={() => {
          if (meditations) {
            SplashScreen.hideAsync();
          }
        }}
      >
        <Text style={[textStyles.title, styles.sway]}>Sway</Text>
        <TouchableOpacity
          onPress={() =>
            navigation
              .getParent()
              ?.navigate("meditate", { screen: "list", params: {} })
          }
          style={[styles.button]}
          activeOpacity={0.4}
        >
          <Text style={[textStyles.title, styles.imageTitle]}>
            Your Daily Meditation
          </Text>
          <Image source={meditationImage} style={styles.image} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
