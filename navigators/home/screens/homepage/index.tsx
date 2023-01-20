import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import { useEffect, useState } from "react";
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
import { baseUrl, secureGet } from "../../../../lib/api/api";
import { getUserId } from "../../../../lib/auth/auth";
import { setMeditations } from "../../../../lib/redux/actions/meditationsActions";
import { setProfile } from "../../../../lib/redux/actions/profileActions";
import { HomeNavigatorParamsList } from "../../HomeNavigatorParamsList";
import backgroundImage from "./background.png";
import backgroundWeb from "./background_web.png";
import meditationImage from "./logo_black.png";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import { LoadingIndicator } from "../../../../components/loading-animation";
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
  // const [id, setId] = useState();
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const meditations = useAppSelector(
    (state) => state.allMeditations.meditations
  );
  const user = useAppSelector((state) => state.userProfile.profile);

  const dispatch = useAppDispatch();

  //  APP SETUP - REFACTOR
  useEffect(() => {
    // Load meditations in to redux state.
    const getMeditations = async () => {
      const res = await axios.get(`${baseUrl}/meditations/`);
      dispatch(setMeditations(res.data));
    };

    // Load meditations if not loaded
    if (!meditations || meditations.length === 0) {
      getMeditations();
    }

    // Load profile in to redux state.
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

    // Check logged in user to compare to redux state.
    const getCurrentUser = async () => {
      const currentUserId = await getUserId();
      return currentUserId;
    };
    if (!user || getCurrentUser() !== user.id) {
      getProfile();
    }

    // Remove loader after max 2.5 seconds regardless. This should be used to load all content. Timeout for now.
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Load profile if not loaded, or if user has changed.
    if (!user || getCurrentUser() !== user.id) {
      getProfile();
    }
  }, [meditations]);

  if (!loading) {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.background, { height: height }]}
          source={width > 480 ? backgroundWeb : backgroundImage}
          onLoad={() => {
            if (meditations) {
              setLoading(false);
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
  }
  return <LoadingIndicator size={100} marginBottom={0} />;
};
