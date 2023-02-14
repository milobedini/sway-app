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
import axios from "axios";

import { Colours } from "../../colours";
import { PauseIcon, PlayIcon, SettingsIcon } from "../icons";
import { TimerSettingsContent } from "./TimerSettingsContext";
import bell from "./Bell.mp3";
import { Fonts } from "../../fonts";
import { textStyles } from "../text";
import { baseUrl, secureWithBody } from "../../lib/api/api";
import { getUserId } from "../../lib/auth/auth";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { setProfile } from "../../lib/redux/actions/profileActions";

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
  const [finished, setFinished] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [user, setUser] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  const dispatch = useAppDispatch();
  // @ts-expect-error redux.
  const profile = useAppSelector((state) => state.userProfile.profile);

  const totalSeconds = settingsInfo.meditationMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds: number | string = Math.floor(secondsLeft % 60);
  if (seconds < 10) seconds = "0" + seconds;

  const { width } = useWindowDimensions();

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const playSound = async (): Promise<void> => {
    const loadedSound = await Audio.Sound.createAsync(bell);
    await loadedSound.sound.playAsync();
  };

  useEffect(() => {
    const checkUser = async () => {
      const userId = await getUserId();
      setUser(Number(userId));
    };
    checkUser();
  }, [user]);

  const addMinutes = async () => {
    // console.log(minutes);
    if (playCount === 0) {
      setPlayCount(1);
      const config = await secureWithBody(
        `${baseUrl}/auth/profile/${user}/`,
        { minutes: profile.minutes + minutes, sessions: profile.sessions + 1 },
        "put"
      );
      try {
        await axios(config);
        const updatedProfile = {
          ...profile,
          minutes: profile.minutes + minutes,
          sessions: profile.sessions + 1,
        };
        dispatch(setProfile(updatedProfile));
      } catch (err) {
        return err;
      }
    }
    return;
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
        setFinished(true);
        setIsPaused(true);
        isPausedRef.current = true;
        secondsLeftRef.current = settingsInfo.meditationMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
        return () => {
          clearInterval(interval);
        };
      }

      return tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

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
          <>
            {finished && (
              <Text
                style={[
                  textStyles.body,
                  { color: Colours.bright.$, textAlign: "center" },
                ]}
              >
                Repeat?
              </Text>
            )}

            <PlayIcon
              fill={Colours.lightGrey.$}
              onPress={() => {
                setIsPaused(false);
                isPausedRef.current = false;
                finished && setPlayCount(0);
                addMinutes();
              }}
            />
          </>
        ) : (
          <PauseIcon
            fill={Colours.lightGrey.$}
            onPress={() => {
              setIsPaused(true);
              setFinished(false);
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
