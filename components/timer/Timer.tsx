import { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

import { Colours } from "../../colours";
import { PauseIcon, PlayIcon, SettingsIcon } from "../icons";
import { TimerSettingsContent } from "./TimerSettingsContext";

export const Timer = (): JSX.Element => {
  const settingsInfo = useContext(TimerSettingsContent);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  useEffect(() => {
    secondsLeftRef.current = settingsInfo.meditationMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return () => clearInterval(interval);
      }
      return tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = settingsInfo.meditationMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds: number | string = Math.floor(secondsLeft % 60);
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <View>
      <CircularProgress
        value={percentage}
        // title={minutes + ":" + seconds}
        title={`${minutes} : ${seconds}`}
        titleColor={Colours.lightGrey.$}
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
      <View style={{ marginTop: 20 }}>
        <SettingsIcon fill={Colours.lightGrey.$} />
      </View>
    </View>
  );
};
