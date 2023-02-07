import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";

import { DetailsWrapper } from "./components/DetailsWrapper";
import { Item } from "./components/Item";
import { Pagination } from "./components/Pagination";
import { welcomeConstants } from "./components/WelcomeConstants";
import { Colours } from "../../../../colours";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import { Fonts } from "../../../../fonts";

export type WelcomeCarouselProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "welcomeCarousel"
>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { height } = Dimensions.get("window");

export const WelcomeCarousel = ({
  navigation,
}: WelcomeCarouselProps): JSX.Element => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (ev) => {
      scrollY.value = ev.contentOffset.y / height;
    },
    onMomentumEnd: (ev) => {
      scrollY.value = Math.floor(ev.contentOffset.y / height);
    },
  });

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#000" }}
    >
      <StatusBar style="dark" />
      <AnimatedFlatList
        data={welcomeConstants.data}
        // @ts-expect-error image.
        renderItem={(props) => <Item {...props} />}
        onScroll={onScroll}
        scrollEventThrottle={16}
        pagingEnabled
        decelerationRate={"fast"}
        bounces={false}
      />
      <Pagination scrollY={scrollY} data={welcomeConstants.data} />
      <DetailsWrapper scrollY={scrollY} data={welcomeConstants.data} />
      <TouchableOpacity
        style={{
          position: "absolute",
          top: welcomeConstants.spacing * 5,
          right: welcomeConstants.spacing,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("register")}
          style={{
            width: welcomeConstants.buttonSize * 3,
            height: welcomeConstants.buttonSize,
            borderRadius: welcomeConstants.buttonSize / 2,
            backgroundColor: Colours.bright.$,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.OpenSans_700Bold,
              fontSize: 16,
              color: Colours.dark.$,
            }}
          >
            Create Account
          </Text>
          <AntDesign
            name="arrowright"
            size={welcomeConstants.buttonSize / 2}
            color={Colours.dark.$}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
