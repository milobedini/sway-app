import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Colours } from "../../../../colours";
import { Fonts } from "../../../../fonts";
import { MoreInfoNavigatorParamsList } from "../../MoreInfoNavigatorParamsList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.lightGrey.$,
  },
  content: {
    alignItems: "stretch",
    padding: 8,
  },
  main: {
    borderRadius: 20,
    padding: 22,
    backgroundColor: Colours.dark.$,
    alignItems: "flex-start",
  },
  title: {
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
    color: Colours.bright.$,
    letterSpacing: -0.2,
    marginVertical: 10,
  },
  section: {},
});

export type IndexScreenProps = StackScreenProps<
  MoreInfoNavigatorParamsList,
  "index"
>;

export const IndexScreen = ({ navigation }: IndexScreenProps): JSX.Element => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <StatusBar style="dark" />
    <View style={styles.main}>
      <View style={styles.section}>
        <Pressable onPress={() => navigation.navigate("profile")}>
          <Text style={styles.title}>Profile</Text>
        </Pressable>
      </View>
    </View>
  </ScrollView>
);
