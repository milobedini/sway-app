import { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import { TimerSettingsContent } from "../../../../components/timer/TimerSettingsContext";
import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { TimerBackIcon } from "../../../../components/icons";
import { Fonts } from "../../../../fonts";

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 28, marginBottom: 20 },
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
  back: {
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
    color: "white",
    paddingLeft: 10,
  },
});

export const SettingsShowScreen = (): JSX.Element => {
  const settingsInfo = useContext(TimerSettingsContent);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={[textStyles.title, styles.label]}>
        {settingsInfo.meditationMinutes} Minutes
      </Text>
      <Slider
        value={settingsInfo.meditationMinutes}
        onValueChange={(newValue) => {
          settingsInfo.setMeditationMinutes(Number(newValue));
        }}
        animateTransitions
        minimumValue={1}
        maximumValue={60}
        thumbTintColor={Colours.bright.$}
        thumbTouchSize={{ width: 45, height: 45 }}
        thumbStyle={{ width: 41, height: 41, borderRadius: 20 }}
        minimumTrackTintColor={Colours.bright.$}
        maximumTrackTintColor={Colours.dark.$}
        step={1}
        containerStyle={{
          width: width - 100,
          height: 45,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: Colours.bright.$,
        }}
      />
      <TouchableOpacity
        style={[styles.settings]}
        activeOpacity={0.7}
        onPress={() => settingsInfo.setShowSettings(false)}
      >
        <TimerBackIcon fill={"white"} />
        <Text style={[styles.back]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};
