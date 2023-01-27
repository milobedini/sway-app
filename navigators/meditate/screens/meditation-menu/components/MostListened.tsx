import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { MeditationListResponseDataItem } from "../../../../../components/meditate-list/mapMeditationTileData";
import { MeditationTileTags } from "../../../../../components/meditation-tile-tags";
import { textStyles } from "../../../../../components/text";
import { useAppSelector } from "../../../../../lib/redux/hooks";
import { Fonts } from "../../../../../fonts";
import { Colours } from "../../../../../colours";
import { shuffle } from "../../../../../lib/shuffle";

type MostListenedProps = {
  onPress: (id: number, image: ImageSourcePropType) => void;
  images: ImageSourcePropType[];
};
export const MostListened = ({
  onPress,
  images,
}: MostListenedProps): JSX.Element => {
  const randomisedImages = shuffle(images.slice());
  const { height } = useWindowDimensions();
  const meditations = useAppSelector(
    (state) => state.allMeditations.meditations
  );

  const mostListenedMeditations = [...meditations].sort((a, b) =>
    a.views < b.views ? 1 : -1
  );
  const styles = StyleSheet.create({
    container: { flex: 1, margin: 12 },
    title: {
      fontFamily: Fonts.OpenSans_700Bold,
      fontSize: 20,
      color: Colours.bright.$,
      marginBottom: 10,
    },

    list: { borderRadius: 10 },
    listItem: {
      paddingRight: 10,
      borderRadius: 10,
      maxWidth: height / 5,
      marginRight: 10,
    },
    image: {
      height: height / 5,
      aspectRatio: 1,
      borderRadius: 8,
    },
    imageText: {
      maxWidth: "100%",
      height: 50,
      color: "white",
      marginHorizontal: 4,
      fontSize: 14,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Listened</Text>
      <FlatList
        data={mostListenedMeditations}
        keyExtractor={(meditation: MeditationListResponseDataItem, index) =>
          meditation.id ? meditation.id.toString() : index.toString()
        }
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                onPress(
                  Number(item.id),
                  //@ts-expect-error image type
                  randomisedImages[index % randomisedImages.length]
                )
              }
            >
              <Image
                //@ts-expect-error image type
                source={randomisedImages[index % randomisedImages.length]}
                style={styles.image}
              />
              <Text
                style={[textStyles.body, styles.imageText]}
                accessibilityRole="header"
              >
                {item.name}
              </Text>

              <MeditationTileTags
                meditation={item}
                colour={Colours.darkGrey.$}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
