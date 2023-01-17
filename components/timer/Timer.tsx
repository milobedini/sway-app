import { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Audio } from "expo-av";

import { Colours } from "../../colours";
import { PauseIcon, PlayIcon, SettingsIcon } from "../icons";
import { TimerSettingsContent } from "./TimerSettingsContext";
import bell from "./Bell.mp3";
import { Fonts } from "../../fonts";

const styles = StyleSheet.create({
  settings: {
    textAlign: "center",
    marginTop: 40,
    backgroundColor: Colours.darkGrey.$,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsText: {
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
    color: "white",
    paddingLeft: 10,
  },
});

export const Timer = (): JSX.Element => {
  const settingsInfo = useContext(TimerSettingsContent);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [sound, setSound] = useState<Audio.Sound>();
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const playSound = async (): Promise<void> => {
    const { sound: loadedSound } = await Audio.Sound.createAsync(bell);
    setSound(loadedSound);
    await loadedSound.playAsync();
  };
  useEffect(() => {
    secondsLeftRef.current = settingsInfo.meditationMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        playSound();
        return () => clearInterval(interval);
      }

      return tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const totalSeconds = settingsInfo.meditationMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds: number | string = Math.floor(secondsLeft % 60);
  if (seconds < 10) seconds = "0" + seconds;

  const { width } = useWindowDimensions();

  return (
    <>
      <CircularProgress
        value={percentage}
        radius={width / 2 - 50}
        title={`${minutes}:${seconds}`}
        titleColor={Colours.lightGrey.$}
        titleFontSize={50}
        titleStyle={{
          fontFamily: Fonts.OpenSans_700Bold,
        }}
        inActiveStrokeColor={Colours.errorDark.$}
        activeStrokeColor={Colours.bright.$}
        showProgressValue={false}
      />
      <View style={{ marginTop: 20 }}>
        {isPaused ? (
          <PlayIcon
            fill={Colours.lightGrey.$}
            onPress={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseIcon
            fill={Colours.lightGrey.$}
            onPress={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={[styles.settings]}
        activeOpacity={0.7}
        onPress={() => settingsInfo.setShowSettings(true)}
      >
        <SettingsIcon fill={"white"} />
        <Text style={[styles.settingsText]}>Settings</Text>
      </TouchableOpacity>
    </>
  );
};
