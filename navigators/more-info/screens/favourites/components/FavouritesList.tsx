import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Animated from "react-native-reanimated";

import { Colours } from "../../../../../colours";
import { mapMeditationTileData } from "../../../../../components/meditate-list/mapMeditationTileData";
import { MeditationTile } from "../../../../../components/meditation-tile";
import { textStyles } from "../../../../../components/text";
import { baseUrl, secureGet } from "../../../../../lib/api/api";
import { getUserId } from "../../../../../lib/auth/auth";
import { shuffle } from "../../../../../lib/shuffle";
import { ThenThrow } from "../../../../../lib/then-throw";
import { meditationGallery } from "../../../../meditate/screens/meditation-menu/gallery/MeditationGallery";

const styles = StyleSheet.create({
  favList: {
    marginHorizontal: 14,
  },
  favs: { marginTop: 45 },
  tile: {
    marginBottom: 12,
  },
  noFavContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export type FavouritesListProps = Omit<ScrollViewProps, "children"> & {
  onPress: (favId: number, image: ImageSourcePropType) => void;
};

export const FavouritesList = ({
  onPress,
  ...rest
}: FavouritesListProps): JSX.Element => {
  const { width } = useWindowDimensions();
  const images = meditationGallery;
  const randomisedImages = shuffle([...images]);
  const [inProgress, setInProgress] = useState(true);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      const config = await secureGet(
        `${baseUrl}/auth/profile/${await getUserId()}/`
      );
      try {
        const res = await axios(config);
        setFavourites(res.data.favourites);
      } catch (err) {
        return err;
      }
    };

    getFavourites();
    setInProgress(false);
  }, []);

  const numColumns = useMemo(() => {
    if (width <= 480) return 1;
    if (width <= 800) return 2;
    return Math.floor((width - 346) / 370);
  }, [width]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const spacing = 30;
  const itemSize = 74 + spacing * 3;

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  if (favourites.length >= 1) {
    return (
      <Animated.View style={{ flex: 1 }}>
        <Animated.FlatList
          style={styles.favList}
          contentContainerStyle={[styles.favs]}
          data={favourites}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(favourite: { id: number }) => String(favourite.id)}
          contentInsetAdjustmentBehavior="automatic"
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          key={numColumns}
          refreshControl={
            <RefreshControl
              refreshing={inProgress}
              tintColor={Colours.dark.$}
              colors={[Colours.dark.$]}
            />
          }
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

  return (
    <View style={styles.noFavContainer}>
      <Text style={[textStyles.body, { maxWidth: "75%", textAlign: "center" }]}>
        You have not favourited any meditations yet!
      </Text>
    </View>
  );
};
