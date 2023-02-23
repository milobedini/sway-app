import {
  Modal,
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
// eslint-disable-next-line
import { AntDesign, Feather as Icon, Ionicons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { AnimatePresence, View as MView } from "moti";
import axios from "axios";

import { Fonts } from "../../fonts";
import { MeditationListResponseDataItem } from "../meditate-list/mapMeditationTileData";
import { Colours } from "../../colours";
import { getUserId } from "../../lib/auth/auth";
import { baseUrl, secureNoBody } from "../../lib/api/api";
import { LinearBackground } from "../linear-background";
import { MeditationAudio } from "./components/MeditationAudio";
import { designStyles } from "../text";

interface MeditationPlayProps {
  onPress: () => void;
  meditation: MeditationListResponseDataItem;
  image: ImageSourcePropType;
}

const colors = {
  primary: Colours.bright.$,
  secondary: Colours.dark.$,
};

export const MeditationPlay = ({
  onPress,
  meditation,
  image,
}: MeditationPlayProps): JSX.Element => {
  const { width } = useWindowDimensions();
  const [buttonState, setButtonState] = useState("EMPTY");
  const [user, setUser] = useState(0);
  const [userLiked, setUserLiked] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (meditation.favourited_by) {
      setCount(meditation.favourited_by.length);
    }

    const checkUserId = async () => {
      const id = await getUserId();
      setUser(Number(id));
    };
    checkUserId();
  }, []);

  useEffect(() => {
    if (user && meditation.favourited_by) {
      if (
        meditation.favourited_by
          .map((item: { id: number }) => item.id)
          .filter((id) => id === user).length > 0
      ) {
        // @ts-expect-error like.
        setUserLiked(true);
      }
    }
  }, [user]);

  const onHeart = async () => {
    const config = await secureNoBody(
      `${baseUrl}/meditations/${meditation.id}/`,
      "put"
    );

    try {
      await axios(config);
    } catch (err) {
      return err;
    }
  };

  const styles = StyleSheet.create({
    root: { flex: 1 },
    container: { margin: 16 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    button: { position: "absolute", left: 0 },
    title: { color: "white", padding: 16 },
    cover: { marginVertical: 16, width: width - 32, height: width - 32 },
    metadata: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: { fontSize: 26, fontFamily: Fonts.OpenSans_700Bold, color: "white" },
    description: {
      color: "white",
      marginTop: 8,
      fontSize: 14,
      lineHeight: 14 * 1.3,
    },
    slider: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      width: width - 32,
      borderRadius: 2,
      height: 4,
      marginVertical: 16,
      marginTop: 8,
    },
    controls: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <SafeAreaView style={styles.root}>
        <LinearBackground />
        <View style={styles.container}>
          <View style={styles.header}>
            <RectButton style={styles.button} {...{ onPress }}>
              <AntDesign name="close" color="white" size={24} />
            </RectButton>
            <Text style={styles.title}>{meditation.name}</Text>
          </View>
          <Image source={image} style={styles.cover} />
          <View style={styles.metadata}>
            <View style={{ maxWidth: width - 80 }}>
              <Text style={styles.name}>{meditation.name}</Text>
              <Text style={[designStyles.body, styles.description]}>
                {meditation.description}
              </Text>
            </View>
            {/* Start of liking functionality. */}
            {!userLiked ? (
              <Pressable
                onPressIn={() => {
                  onHeart;
                  setButtonState("PRESSED");
                }}
                onPressOut={() => {
                  setCount((count) => count + 1);
                  // @ts-expect-error liked.
                  setUserLiked(true);
                  setButtonState("ACTIVE");
                  onHeart;
                }}
                onPress={onHeart}
                style={{ marginLeft: 4 }}
              >
                <AnimatePresence>
                  <MView
                    key={`bg-${count}`}
                    from={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 0.5, opacity: 0 }}
                    exit={{ scale: 3, opacity: 0 }}
                    transition={{
                      type: "timing",
                      duration: 600,
                    }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        backgroundColor: colors.primary,
                        borderRadius: 50,
                      },
                    ]}
                  />
                </AnimatePresence>
                <AnimatePresence>
                  {buttonState === "ACTIVE" && !userLiked && (
                    <MView
                      key={`label-${count}`}
                      from={{ translateY: 40, opacity: 0 }}
                      animate={{
                        translateY: [-40, -40, 0],
                        opacity: [1, 1, 0],
                      }}
                      exit={{ translateY: 0, opacity: 0 }}
                      transition={{ type: "timing", duration: 400 }}
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        backgroundColor: Colours.errorDark.$,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSans_700Bold,
                          fontSize: 16,
                          color: "white",
                        }}
                      >
                        {count}
                      </Text>
                    </MView>
                  )}
                </AnimatePresence>
                <MView
                  style={{
                    padding: 14,
                    borderRadius: 20,
                    backgroundColor: colors.secondary,
                    borderWidth: 0.17,
                    borderColor: "white",
                  }}
                  from={{
                    scale: 1,
                  }}
                  animate={{
                    scale: buttonState === "PRESSED" ? 0.9 : 1,
                  }}
                  transition={{
                    type: "timing",
                    duration: 200,
                  }}
                >
                  <MView
                    from={{
                      scale: 1,
                    }}
                    animate={{
                      scale: buttonState === "PRESSED" ? 0.8 : [1.4, 1],
                    }}
                    transition={{
                      type: "timing",
                      duration: 300,
                    }}
                  >
                    <AntDesign name="heart" size={24} color={colors.primary} />
                  </MView>
                </MView>
              </Pressable>
            ) : (
              <Pressable
                onPressIn={() => {
                  setButtonState("PRESSED");
                }}
                onPressOut={() => {
                  setCount((count) => count - 1);
                  // @ts-expect-error liked.
                  setUserLiked(false);
                  setButtonState("ACTIVE");
                }}
                onPress={onHeart}
                style={{ marginLeft: 4 }}
              >
                <AnimatePresence>
                  <MView
                    key={`bg-${count}`}
                    from={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 0.5, opacity: 0 }}
                    exit={{ scale: 3, opacity: 0 }}
                    transition={{
                      type: "timing",
                      duration: 600,
                    }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        backgroundColor: "colors.primary",
                        borderRadius: 50,
                      },
                    ]}
                  />
                </AnimatePresence>
                <AnimatePresence>
                  {buttonState === "ACTIVE" && (
                    <MView
                      key={`label-${count}`}
                      from={{ translateY: 40, opacity: 0 }}
                      animate={{
                        translateY: [-40, -40, 0],
                        opacity: [1, 1, 0],
                      }}
                      exit={{ translateY: 0, opacity: 0 }}
                      transition={{ type: "timing", duration: 400 }}
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        backgroundColor: Colours.bright.$,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSans_700Bold,
                          fontSize: 16,
                          color: "white",
                        }}
                      >
                        {count}
                      </Text>
                    </MView>
                  )}
                </AnimatePresence>
                <MView
                  style={{
                    padding: 16,
                    borderRadius: 20,
                    backgroundColor: colors.secondary,
                    borderWidth: 0.17,
                    borderColor: "white",
                  }}
                  from={{
                    scale: 1,
                  }}
                  animate={{
                    scale: buttonState === "PRESSED" ? 0.9 : 1,
                  }}
                  transition={{
                    type: "timing",
                    duration: 200,
                  }}
                >
                  <MView
                    from={{
                      scale: 1,
                    }}
                    animate={{
                      scale: buttonState === "PRESSED" ? 0.8 : [1.4, 1],
                    }}
                    transition={{
                      type: "timing",
                      duration: 300,
                    }}
                  >
                    <Ionicons
                      name="heart-dislike"
                      size={24}
                      color={colors.primary}
                    />
                  </MView>
                </MView>
              </Pressable>
            )}
          </View>
          <MeditationAudio
            audioSource={meditation.audio}
            minutes={meditation.minutes}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
