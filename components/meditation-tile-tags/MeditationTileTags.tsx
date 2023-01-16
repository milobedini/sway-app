import { StyleSheet, View, ViewProps } from "react-native";

import { MeditationTileData } from "../meditation-tile/MeditationTileData";
import { Category } from "./Category";
import { Minutes } from "./Minutes";

export type MeditationTileTagsProps = ViewProps & {
  meditation: MeditationTileData;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginHorizontal: 4,
    marginVertical: 2,
  },
});

export const MeditationTileTags = ({
  meditation,
  style,
  ...rest
}: MeditationTileTagsProps): JSX.Element => (
  <View style={[styles.container, style]} {...rest}>
    <Category meditation={meditation} style={styles.tag} />
    <Minutes meditation={meditation} style={styles.tag} />
  </View>
);
