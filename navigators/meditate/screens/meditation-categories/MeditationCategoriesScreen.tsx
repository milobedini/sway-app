import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useRef, useState } from "react";

import { Colours } from "../../../../colours";
import { meditationCategoryGallery } from "./gallery/MeditationCategoryGallery";
import { categoryMap } from "./components/CategoryMap";
import { textStyles } from "../../../../components/text";
import { useAppSelector } from "../../../../lib/redux/hooks";
import { MeditationListResponseDataItem } from "../../../../components/meditate-list/mapMeditationTileData";
import { shuffle } from "../../../../lib/shuffle";
import { meditationGallery } from "../meditation-menu/gallery/MeditationGallery";

const IMAGE_SIZE = 80;
const SPACING = 10;
const randomisedImages = shuffle(meditationGallery.slice());

export const MeditationCategoriesScreen = (): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "'rgba(52, 52, 52, 0.0)'" },
    label: {
      color: "white",
      fontSize: 16,
      maxWidth: IMAGE_SIZE,
      textAlign: "center",
    },
    list: {
      borderRadius: 10,

      position: "absolute",
      bottom: 8,
    },
    listItem: {
      borderRadius: 10,
      maxWidth: height / 5,
      marginRight: 10,
      backgroundColor: "rgba(12, 21, 39, 0.6)",
      borderWidth: 1,
      borderColor: Colours.bright.$,
      alignItems: "center",
      justifyContent: "center",
      width: IMAGE_SIZE * 2,
      padding: 4,
    },
    image: {
      borderRadius: 8,
    },
    imageText: {
      maxWidth: "100%",
      height: 50,
      color: "white",
      fontSize: 14,
    },
  });

  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState("All");

  const allMeditations = useAppSelector(
    (state) => state.allMeditations.meditations
  );
  const meditationsWithfilter = [...allMeditations].filter((meditation) => {
    if (filter === "All") {
      return allMeditations;
    }
    if (filter === "Shorter") {
      return meditation.minutes <= 10;
    }
    if (filter === "Longer") {
      return meditation.minutes > 10;
    }

    return meditation.category.includes(filter);
  });

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    // sync and scroll flatlists
    // @ts-expect-error ref.
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    // Is middle of thumbnail greater than middle of screen position?
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      // @ts-expect-error ref.
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      // go back to 0 if below half screen.
      // @ts-expect-error ref.
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (!meditationCategoryGallery || !meditationsWithfilter) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        // @ts-expect-error ref.
        ref={topRef}
        data={meditationCategoryGallery}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={(item) => {
          return (
            <View style={{ width: width, height: height }}>
              <Image
                source={item.item}
                style={[{ width: width, height: height }]}
              />
            </View>
          );
        }}
      />
      <FlatList
        // @ts-expect-error ref.
        ref={thumbRef}
        data={meditationCategoryGallery}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: IMAGE_SIZE * 2 }}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
          backgroundColor: "transparent",
        }}
        initialScrollIndex={0}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setFilter(categoryMap[item.index]);
                scrollToIndex(item.index);
              }}
            >
              <Image
                source={item.item}
                style={[
                  {
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 12,
                    marginRight: SPACING,
                    borderWidth: 2,
                    borderColor:
                      activeIndex === item.index
                        ? Colours.bright.$
                        : "transparent",
                  },
                ]}
              />
              <Text style={[textStyles.body, styles.label]}>
                {categoryMap[item.index]}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
        data={meditationsWithfilter}
        keyExtractor={(meditation: MeditationListResponseDataItem, index) =>
          meditation.id ? meditation.id.toString() : index.toString()
        }
        horizontal
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}

              // onPress={() =>
              //   onPress(
              //     Number(item.id),
              //     //@ts-expect-error image type
              //     randomisedImages[index % randomisedImages.length]
              //   )
              // }
            >
              <Image
                //@ts-expect-error image type
                source={randomisedImages[index % randomisedImages.length]}
                style={[
                  {
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 12,
                    marginRight: SPACING,
                  },
                  styles.image,
                ]}
              />

              <Text
                style={[textStyles.body, styles.imageText]}
                accessibilityRole="header"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
};
