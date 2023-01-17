import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Colours } from "../../../../colours";
import { TimerSettingsContent } from "../../../../components/timer";
import { Timer } from "../../../../components/timer/Timer";
import { TimerNavigatorParamsList } from "../../TimerNavigatorParamsList";
import { SettingsShowScreen } from "../settings-show";

export type TimerShowScreenProps = StackScreenProps<
  TimerNavigatorParamsList,
  "show"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    alignItems: "center",
  },
});

export const TimerShowScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: TimerShowScreenProps): JSX.Element => {
  const [showSettings, setShowSettings] = useState(false);
  const [meditationMinutes, setMeditationMinutes] = useState(1);
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <TimerSettingsContent.Provider
            value={{
              showSettings,
              setShowSettings,
              meditationMinutes,
              setMeditationMinutes,
            }}
          >
            {showSettings ? <SettingsShowScreen /> : <Timer />}
          </TimerSettingsContent.Provider>
        </View>
      </View>
    </>
  );
};
