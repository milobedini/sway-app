import { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { textStyles } from "../../../../components/text";
import { Colours } from "../../../../colours";
import { Progress } from "../progress";

export type TourScreenProps = {
  body: string;
  imageSource: ImageSourcePropType;
  pageNumber: number;
  smallStatusBarStyle?: StatusBarStyle;
  title: string;
  children: ReactNode;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: Colours.lightGrey.$,
  },
  title: {
    color: Colours.dark.$,
    textAlign: "center",
  },
  body: {
    color: Colours.dark.$,
    textAlign: "center",
  },
  card: {
    backgroundColor: Colours.bright.$,
    paddingHorizontal: 50,
    paddingVertical: 30,
    display: "flex",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    flexGrow: 1,
    resizeMode: "cover",
    flexShrink: 1,
    marginBottom: -50,
    width: "100%",
    position: "relative",
  },
});

export const TourScreen = ({
  body,
  children,
  imageSource,
  pageNumber,
  smallStatusBarStyle = "light",
  title,
}: TourScreenProps): JSX.Element => (
  <View style={styles.container}>
    <StatusBar style={Platform.OS === "ios" ? smallStatusBarStyle : "dark"} />
    <Image source={imageSource} style={styles.image} />
    <View style={styles.card}>
      <SafeAreaView edges={["bottom"]}>
        <Progress pageNumber={pageNumber} />
        <Text style={[textStyles.title, styles.title]}>{title}</Text>
        <Text style={[textStyles.body, styles.body]}>{body}</Text>
        {children}
      </SafeAreaView>
    </View>
  </View>
);
