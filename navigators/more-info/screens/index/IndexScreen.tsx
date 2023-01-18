import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Colours } from "../../../../colours";
import { HorizontalRule } from "../../../../components/horizontal-rule";
import { Fonts } from "../../../../fonts";
import { signOut } from "../../../../lib/auth/auth";
import { MoreInfoNavigatorParamsList } from "../../MoreInfoNavigatorParamsList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
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
  section: {
    marginVertical: 10,
  },
  divider: {
    marginVertical: 24,
  },
});

export type IndexScreenProps = StackScreenProps<
  MoreInfoNavigatorParamsList,
  "index"
>;

export const IndexScreen = ({ navigation }: IndexScreenProps): JSX.Element => {
  const handleSignOut = () => {
    navigation.reset({
      routes: [{ name: "app", params: { userSignedOut: true } }],
    });
    signOut();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />
      <View style={styles.main}>
        <View style={styles.section}>
          <Pressable onPress={() => navigation.navigate("profile")}>
            <Text style={styles.title}>Profile</Text>
          </Pressable>
        </View>
        <HorizontalRule
          color={Colours.lightGrey.$}
          style={[styles.divider, { width: "100%" }]}
        />
        <View style={styles.section}>
          <Pressable onPress={handleSignOut}>
            <Text style={styles.title}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
