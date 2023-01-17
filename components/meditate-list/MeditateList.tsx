import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated from "react-native-reanimated";

import { Colours } from "../../colours";
import { baseUrl } from "../../lib/api/api";
import { ThenThrow } from "../../lib/then-throw";
import { MeditationTile } from "../meditation-tile";
import { mapMeditationTileData } from "./mapMeditationTileData";

const styles = StyleSheet.create({
  meditations: {
    padding: 8,
    paddingTop: 16,
  },
  tile: {
    margin: 8,
  },
});

export type MeditateListProps = Omit<ScrollViewProps, "children"> & {
  onPress: (meditationId: number) => void;
};

// WIREFRAME
/* 
Basically want category tiles that expand to show each. 
(Effectively a filter in the background).

*/
export const MeditateList = ({
  style,
  onPress,
  ...rest
}: MeditateListProps): JSX.Element => {
  const { width } = useWindowDimensions();

  const [inProgress, setInProgress] = useState(true);
  const [meditations, setMeditations] = useState([]);

  useEffect(() => {
    const getMeditations = async () => {
      setInProgress(true);
      const res = await axios.get(`${baseUrl}/meditations/`);
      setMeditations(res.data);
    };
    getMeditations();
    setInProgress(false);
  }, []);

  const numColumns = useMemo(() => {
    if (width <= 480) return 1;
    if (width <= 800) return 2;
    return Math.floor((width - 346) / 370);
  }, [width]);

  return (
    <Animated.FlatList
      style={style}
      contentContainerStyle={styles.meditations}
      data={meditations}
      keyExtractor={(meditation) => String(meditation.id)}
      contentInsetAdjustmentBehavior="automatic"
      numColumns={numColumns}
      key={numColumns}
      refreshControl={
        <RefreshControl
          refreshing={inProgress}
          tintColor={Colours.dark.$}
          colors={[Colours.dark.$]}
        />
      }
      renderItem={(meditation) => (
        <MeditationTile
          key={meditation.item.id}
          style={styles.tile}
          meditation={mapMeditationTileData(meditation.item)}
          // eslint-disable-next-line
          onPress={() =>
            onPress(meditation.item.id ?? ThenThrow("Missing meditation id!"))
          }
        />
      )}
      {...rest}
    ></Animated.FlatList>
  );
};
