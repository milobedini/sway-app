import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useRef, useState } from "react";

import image1 from "./gallery/one.png";
import image2 from "./gallery/two.png";
import image3 from "./gallery/three.png";
import image4 from "./gallery/four.png";
import image5 from "./gallery/five.png";
import image6 from "./gallery/six.png";
import image7 from "./gallery/seven.png";
import image8 from "./gallery/eight.png";
import { Colours } from "../../../../colours";

const styles = StyleSheet.create({ container: { flex: 1 } });

const IMAGE_SIZE = 80;
const SPACING = 10;

export const MeditationMenuScreen = (): JSX.Element => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  const { width, height } = useWindowDimensions();

  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

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

  if (!images) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        // @ts-expect-error ref.
        ref={topRef}
        data={images}
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
        data={images}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        initialScrollIndex={0}
        renderItem={(item) => {
          return (
            <TouchableOpacity onPress={() => scrollToIndex(item.index)}>
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
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
