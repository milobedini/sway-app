import { useContext } from "react";
import { Text, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import { TimerSettingsContent } from "../../../../components/timer/TimerSettingsContext";

export const SettingsShowScreen = (): JSX.Element => {
  const settingsInfo = useContext(TimerSettingsContent);

  return (
    <View>
      <Text>Timer Settings</Text>
    </View>
  );
};
