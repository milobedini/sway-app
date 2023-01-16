import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { Fonts } from "../../../../fonts";
import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";
import learnBackground from "./LearnCover.png";

export type LearnHomeScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "home"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  background: { width: "100%", height: "100%" },
  title: {
    color: Colours.white.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 20,
  },
  topButton: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colours.dark.$,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colours.white.$,
    width: "50%",
    // margin: 16,
  },
  bottomButton: {
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Colours.dark.$,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colours.white.$,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export const LearnHomeScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: LearnHomeScreenProps): JSX.Element => (
  <ImageBackground source={learnBackground} style={styles.background}>
    <StatusBar style="dark" />
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.topButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("notes")}
      >
        <Text style={[textStyles.title, styles.title]}>Notes</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("articles")}
        >
          <Text style={[textStyles.title, styles.title]}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("community")}
        >
          <Text style={[textStyles.title, styles.title]}>Community</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
);
