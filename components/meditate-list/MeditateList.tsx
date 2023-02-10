import { useMemo, useRef } from "react";
import {
  ImageSourcePropType,
  ScrollViewProps,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

import { Colours } from "../../colours";
import { useAppSelector } from "../../lib/redux/hooks";
import { ThenThrow } from "../../lib/then-throw";
import { MeditationTile } from "../meditation-tile";
import { mapMeditationTileData } from "./mapMeditationTileData";
import { shuffle } from "../../lib/shuffle";
import { meditationGallery } from "../../navigators/meditate/screens/meditation-menu/gallery/MeditationGallery";

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
  onPress: (meditationId: number, image: ImageSourcePropType) => void;
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
  const images = meditationGallery;

  const randomisedImages = shuffle([...images]);

  const meditations = useAppSelector(
    (state) => state.allMeditations.meditations
  );

  const numColumns = useMemo(() => {
    if (width <= 480) return 1;
    if (width <= 800) return 2;
    return Math.floor((width - 346) / 370);
  }, [width]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const spacing = 30;
  const itemSize = 74 + spacing * 3;

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  if (meditations) {
    return (
      <Animated.View style={{ flex: 1 }}>
        <Animated.FlatList
          style={style}
          contentContainerStyle={styles.meditations}
          data={meditations}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(meditation: { id: number }) => String(meditation.id)}
          contentInsetAdjustmentBehavior="automatic"
          numColumns={numColumns}
          key={numColumns}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              itemSize * index,
              // finish after 2 items
              itemSize * (index + 1),
            ];
            const opacityInputRange = [
              -1,
              0,
              itemSize * index,
              // finish after 2 items
              itemSize * (index + 0.5),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <AnimatedTouchable
                style={{ opacity, transform: [{ scale }] }}
                onPress={() =>
                  onPress(
                    item.id,
                    //@ts-expect-error image type
                    randomisedImages[index % randomisedImages.length] ??
                      ThenThrow("Missing meditation id!")
                  )
                }
              >
                <MeditationTile
                  key={item.id}
                  style={[styles.tile]}
                  meditation={mapMeditationTileData(item)}
                  image={randomisedImages[index % randomisedImages.length]}
                />
              </AnimatedTouchable>
            );
          }}
          {...rest}
        ></Animated.FlatList>
      </Animated.View>
    );
  }
  return <View style={{ backgroundColor: Colours.dark.$, flex: 1 }}></View>;
};
