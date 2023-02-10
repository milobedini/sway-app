import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

import { Colours } from "../../../../colours";
import { HorizontalRule } from "../../../../components/horizontal-rule";
import { Fonts } from "../../../../fonts";
import { signOut } from "../../../../lib/auth/auth";
import { MoreInfoNavigatorParamsList } from "../../MoreInfoNavigatorParamsList";
import { ProfileScreen } from "../profile/ProfileScreen";

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
    backgroundColor: Colours.darkButton.$,
    width: "100%",
    padding: 12,
    borderRadius: 12,
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
      <StatusBar style="light" />
      <MotiView
        style={styles.main}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 }}
      >
        {/* Profile View */}
        <ProfileScreen />
        <HorizontalRule
          color={Colours.lightGrey.$}
          style={[styles.divider, { width: "100%" }]}
        />
        {/* Favourite Meditations Link*/}
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("favourites")}
        >
          <Text style={[styles.title, { color: "white" }]}>
            Favourite Meditations
          </Text>
        </TouchableOpacity>

        {/* Menu View */}
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("about")}
        >
          <Text style={[styles.title, { color: "white" }]}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.section}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Text style={[styles.title, { color: "white" }]}>Sign Out</Text>
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );
};
