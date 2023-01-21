import {
  Modal,
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Audio, InterruptionModeIOS } from "expo-av";
import { useEffect, useState } from "react";

import MedTile from "./MedTile.png";
import { Fonts } from "../../fonts";
import { MeditationListResponseDataItem } from "../meditate-list/mapMeditationTileData";

interface MeditationPlayProps {
  onPress: () => void;
  meditation: MeditationListResponseDataItem;
}

export const MeditationPlay = ({
  onPress,
  meditation,
}: MeditationPlayProps): JSX.Element => {
  const { width } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    });
    loadNewPlaybackInsance();
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPlaying(status.isPlaying);
    }
  };
  const loadNewPlaybackInsance = async () => {
    if (playbackInstance !== null) {
      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
    }
    const { sound, status } = await Audio.Sound.createAsync({
      uri: meditation.audio,
    });

    setSound(sound);
    setStatus(status);
    onPlaybackStatusUpdate(status);

    setPlaybackInstance(sound);
  };

  const onPlayPausePressed = () => {
    if (playbackInstance != null) {
      if (playing) {
        playbackInstance.pauseAsync();
        setPlaying(false);
      } else {
        playbackInstance.playAsync();
        setPlaying(true);
      }
    }
  };

  const onClose = async () => {
    if (playbackInstance !== null) {
      setPlaying(false);
      playbackInstance.pauseAsync();

      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
      onPress();
    }
  };

  const styles = StyleSheet.create({
    root: { flex: 1 },
    container: { margin: 16 },
    header: { flexDirection: "row", justifyContent: "space-between" },
    button: { padding: 16 },
    title: { color: "white", padding: 16 },
    cover: { marginVertical: 16, width: width - 32, height: width - 32 },
    metadata: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    song: { fontSize: 26, fontFamily: Fonts.OpenSans_700Bold, color: "white" },
    artist: { color: "white", marginTop: 14 },
    slider: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      width: width - 32,
      borderRadius: 2,
      height: 4,
      marginVertical: 16,
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
        <LinearGradient
          colors={["#0b3057", "#051c30"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <RectButton style={styles.button} {...{ onPress }}>
              <Icon name="chevron-down" color="white" size={24} />
            </RectButton>
            <Text style={styles.title}>{meditation.name}</Text>
            <RectButton
              style={styles.button}
              onPress={async () => {
                await onClose();
              }}
            >
              <AntDesign name="close" color="white" size={24} />
            </RectButton>
          </View>
          <Image source={MedTile} style={styles.cover} />
          <View style={styles.metadata}>
            <View>
              <Text style={styles.song}>{meditation.name}</Text>
              <Text style={styles.artist}>{meditation.description}</Text>
            </View>
            <AntDesign name="heart" size={24} color="#55b661" />
          </View>
          <View style={styles.slider} />
          <TouchableOpacity style={styles.controls}>
            <AntDesign
              name={playing ? "pause" : "play"}
              color="white"
              size={48}
              onPress={onPlayPausePressed}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
