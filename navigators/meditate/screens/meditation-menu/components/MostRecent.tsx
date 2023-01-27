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

type MostRecentProps = {
  onPress: () => void;
  onTouch: (id: number, image: ImageSourcePropType) => void;
  images: ImageSourcePropType[];
};
export const MostRecent = ({
  onPress,
  onTouch,
  images,
}: MostRecentProps): JSX.Element => {
  const { height } = useWindowDimensions();
  const meditations = useAppSelector(
    (state) => state.allMeditations.meditations
  );

  const randomisedImages = shuffle(images.slice());

  const styles = StyleSheet.create({
    container: { flex: 1, margin: 12, marginTop: 8 },

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
    title: {
      fontFamily: Fonts.OpenSans_700Bold,
      fontSize: 20,
      color: Colours.bright.$,
    },
    topText: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
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
      <View style={styles.topText}>
        <Text style={styles.title}>Most Recent</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colours.dark.$,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 12,
            borderRadius: 1000,
            borderWidth: 1,
            borderColor: Colours.bright.$,
            paddingVertical: 4,
          }}
          onPress={onPress}
        >
          <Text
            style={[
              styles.title,
              {
                marginBottom: 0,
                color: "white",
                fontSize: 18,
              },
            ]}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meditations}
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
              onPress={() => {
                onTouch(
                  Number(item.id),
                  //@ts-expect-error image type
                  randomisedImages[index % randomisedImages.length]
                );
              }}
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
                //@ts-expect-error naming mismatch
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
