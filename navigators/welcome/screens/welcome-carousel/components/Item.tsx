import { Dimensions, ImageBackground, ImageSourcePropType } from "react-native";

const { width, height } = Dimensions.get("window");

type ItemProp = {
  item: {
    image: ImageSourcePropType;
  };
};

export const Item = ({ item }: ItemProp): JSX.Element => (
  <ImageBackground
    source={item.image}
    style={{
      width,
      height,
      backgroundColor: "#000",
    }}
    imageStyle={{
      flex: 1,
      resizeMode: "cover",
      opacity: 0.7,
    }}
  ></ImageBackground>
);
