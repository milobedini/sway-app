import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../../../../colours";
import { mapMeditationTileData } from "../../../../../components/meditate-list/mapMeditationTileData";
import { MeditationTile } from "../../../../../components/meditation-tile";
import { textStyles } from "../../../../../components/text";
import { baseUrl, secureGet } from "../../../../../lib/api/api";
import { getUserId } from "../../../../../lib/auth/auth";
import { ThenThrow } from "../../../../../lib/then-throw";

const styles = StyleSheet.create({
  favList: {
    marginHorizontal: 14,
  },
  favs: { marginTop: 45 },
  tile: {
    marginBottom: 12,
  },
});

export type FavouritesListProps = Omit<ScrollViewProps, "children"> & {
  onPress: (favId: number) => void;
};

export const FavouritesList = ({
  onPress,
  ...rest
}: FavouritesListProps): JSX.Element => {
  const { width } = useWindowDimensions();
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

  if (favourites) {
    const numColumns = useMemo(() => {
      if (width <= 480) return 1;
      if (width <= 800) return 2;
      return Math.floor((width - 346) / 370);
    }, [width]);

    return (
      <SafeAreaView edges={["top"]}>
        <Animated.FlatList
          style={styles.favList}
          contentContainerStyle={[styles.favs]}
          data={favourites}
          keyExtractor={(favourite) => String(favourite.id)}
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
          renderItem={(favourite) => (
            <MeditationTile
              key={favourite.item.id}
              style={styles.tile}
              meditation={mapMeditationTileData(favourite.item)}
              onPress={() =>
                onPress(
                  favourite.item.id ?? ThenThrow("Missing fav meditation id!")
                )
              }
            />
          )}
          {...rest}
        ></Animated.FlatList>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.favList}>
      <Text style={textStyles.title}>
        You have not favourited any meditations yet!
      </Text>
    </View>
  );
};
