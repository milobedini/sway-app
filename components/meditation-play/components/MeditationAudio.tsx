import { Slider } from "@miblanchard/react-native-slider";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

import { Colours } from "../../../colours";
import { Fonts } from "../../../fonts";
import { baseUrl, secureWithBody } from "../../../lib/api/api";
import { getUserId } from "../../../lib/auth/auth";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import { setProfile } from "../../../lib/redux/actions/profileActions";

type MeditationAudioProps = {
  audioSource: string | undefined;
  minutes: number | undefined;
};
export const MeditationAudio = ({
  audioSource,
  minutes,
}: MeditationAudioProps): JSX.Element => {
  const [audio, setAudio] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [user, setUser] = useState(0);

  const dispatch = useAppDispatch();
  // @ts-expect-error redux.
  const profile = useAppSelector((state) => state.userProfile.profile);

  useEffect(() => {
    const checkUser = async () => {
      const userId = await getUserId();
      setUser(Number(userId));
    };
    checkUser();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (audioSource) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: 1,
          interruptionModeAndroid: 1,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
        });
        const { sound } = await Audio.Sound.createAsync({
          uri: audioSource,
        });
        setAudio(sound);
      }
    })();
  }, [audioSource]);

  const addMinutes = async (medMinutes: number) => {
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
          minutes: profile.minutes + medMinutes,
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
    if (audio) {
      audio.setOnPlaybackStatusUpdate((status) => {
        // @ts-expect-error audio.
        setIsPlaying(status.isPlaying);
        // @ts-expect-error audio.
        setPosition(status.positionMillis);
        // @ts-expect-error audio.
        setDuration(status.durationMillis);
        if (
          // @ts-expect-error audio.
          status.positionMillis >= 59000 &&
          // @ts-expect-error audio.
          status.positionMillis <= 61000 &&
          minutes
        ) {
          addMinutes(minutes);
        }
      });
    }
  }, [audio]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.unloadAsync();
      }
    };
  }, [audio]);

  useEffect(() => {
    (async () => {
      if (audio) {
        await audio.playAsync();
      }
    })();
  }, [audio]);

  const handlePlayPause = async () => {
    if (audio) {
      if (isPlaying) {
        await audio.pauseAsync();
      } else {
        await audio.playAsync();
      }
    }
  };

  const handleSliderChange = async (value: number) => {
    if (audio) {
      //   console.log("TRYING TO CHANGE AUDIO POSITION to ", value);
      await audio.setPositionAsync(value);
    }
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  if (audioSource) {
    return (
      <>
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={() => handleSliderChange(position)}
          step={1000}
          thumbTintColor={Colours.bright.$}
        />
        <Text style={{ fontFamily: Fonts.OpenSans_400Regular, color: "white" }}>
          {formatTime(position)} / {formatTime(duration)}
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <AntDesign
            name={isPlaying ? "pause" : "play"}
            color="white"
            size={48}
            onPress={handlePlayPause}
          />
        </TouchableOpacity>
      </>
    );
  }
  return <></>;
};
