import { StackScreenProps } from "@react-navigation/stack";
import { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  add,
  BackdropFilter,
  Blur,
  Canvas,
  Circle,
  DisplacementMap,
  Fill,
  LinearGradient,
  mix,
  Offset,
  sub,
  Turbulence,
  useComputedValue,
  useLoop,
  vec,
} from "@shopify/react-native-skia";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { ThenThrow } from "../../../../lib/then-throw";
import { HomeNavigatorParamsList } from "../../HomeNavigatorParamsList";
import meditationImage from "./logo_black.png";
import { useAppSelector } from "../../../../lib/redux/hooks";
import { meditationGallery } from "../../../meditate/screens/meditation-menu/gallery/MeditationGallery";
export type HomeScreenProps = StackScreenProps<
  HomeNavigatorParamsList,
  "homepage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
  },
  buttonContainer: {
    flex: 0.5,
    paddingTop: 80,
  },
  button: {
    flexDirection: "row",
    width: 300,
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "10%",
    backgroundColor: "rgba(43, 59, 91, 0.4)",
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

export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const latestMeditation = useAppSelector(
    //@ts-expect-error redux naming issue
    (state) => state.latestMeditation.latestMeditation
  );

  const progress = useLoop({ duration: 2000 });
  const { width, height } = useWindowDimensions();
  const c = vec(width / 2, height / 4);
  const r = c.x - 32;
  // below defines half of the screen
  const rect = useMemo(
    () => ({ x: 0, y: c.y, width, height: c.y }),
    [c.y, width]
  );
  const start = useComputedValue(
    () => sub(c, vec(0, mix(progress.current, r, r / 2))),
    [progress]
  );
  const end = useComputedValue(
    () => add(c, vec(0, mix(progress.current, r, r / 2))),
    []
  );
  const radius = useComputedValue(
    () => mix(progress.current, r, r / 2),
    [progress]
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (latestMeditation.id !== 0) {
              navigation.navigate("show", {
                meditationId: latestMeditation.id,
                image:
                  meditationGallery[
                    Math.floor(Math.random() * meditationGallery.length)
                  ],
              });
            } else {
              ThenThrow("Missing meditation id!");
            }
          }}
          style={[styles.button]}
          activeOpacity={0.4}
        >
          <Text style={[textStyles.title, styles.imageTitle]}>
            Your Daily Meditation
          </Text>
          <Image source={meditationImage} style={styles.image} />
        </TouchableOpacity>
      </View>
      <Canvas
        style={{
          flex: 1,
        }}
      >
        <Circle c={c} r={radius}>
          <LinearGradient
            start={start}
            end={end}
            colors={[Colours.bright.$, "#E70696"]}
          />
        </Circle>
        <BackdropFilter filter={<Blur blur={10} />} clip={rect}>
          <Circle c={c} r={radius}>
            <LinearGradient
              start={start}
              end={end}
              colors={[Colours.bright.$, "#E70696"]}
            />
          </Circle>
          <Blur blur={1}>
            <Offset x={0} y={0}>
              <DisplacementMap channelX="a" channelY="r" scale={50}>
                <Turbulence freqX={0.01} freqY={0.05} octaves={4} />
              </DisplacementMap>
            </Offset>
          </Blur>
          <Fill color="rgba(0, 0, 0, 0.3)" />
        </BackdropFilter>
      </Canvas>
    </View>
  );
};
