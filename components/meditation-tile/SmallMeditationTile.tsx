import { Image, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { Colours } from "../../colours";
import { MeditationTileTags } from "../meditation-tile-tags";
import { textStyles } from "../text";
import { MeditationTileProps } from "./MeditationTileProps";
import medTile from "./MedTile.png";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.dark.$,
    borderRadius: 15,
    padding: 8,
    borderWidth: 0.5,
    borderColor: Colours.bright.$,
    shadowColor: Colours.white.$,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  imageAndTitleContainer: {
    flexDirection: "row",
  },
  image: {
    borderRadius: 10,
    width: 82,
    height: 82,
    margin: 4,
  },
  title: {
    color: Colours.white.$,
    margin: 8,
    marginVertical: 19,
    flexWrap: "wrap",
    flex: 1,
  },
  tags: {
    margin: 6,
  },
});

export const SmallMeditationTile = ({
  meditation,
  style,
  ...rest
}: MeditationTileProps): JSX.Element => (
  <Animated.View style={[styles.container, style]} {...rest}>
    <View style={styles.imageAndTitleContainer}>
      {/* Needs to become meditation image once these have been added. Image for each category */}
      <Image source={medTile} style={styles.image} />
      <Text style={[textStyles.body, styles.title]} accessibilityRole="header">
        {meditation.name}
      </Text>
    </View>
    <MeditationTileTags style={styles.tags} meditation={meditation} />
  </Animated.View>
);
