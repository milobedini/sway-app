import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MeditateList } from "../../../../components/meditate-list";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";
import { Colours } from "../../../../colours";

export type MeditateListScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "list"
>;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colours.dark.$, paddingTop: 20 },
});

export const MeditateListScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: MeditateListScreenProps): JSX.Element => {
  /* 
  WIREFRAME
  Basically want category tiles that expand to show each. 
  (Effectively a filter in the background).
  Then clicking on one takes you to meditation show. This has all the info and a button to start listening.
  The button then launches a media player module on top of the show screen.
  */
  const { top } = useSafeAreaInsets();
  return (
    <>
      <StatusBar style="light" />
      <AntDesign
        name="search1"
        size={30}
        color="white"
        style={{
          position: "absolute",
          top: top + 8,
          right: 16,
          zIndex: 999,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate("search")}
      />
      <MeditateList
        style={styles.container}
        onPress={(id) => {
          navigation.navigate("show", {
            meditationId: id,
          });
        }}
      />
    </>
  );
};
