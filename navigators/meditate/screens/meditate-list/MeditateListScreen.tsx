import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { MeditateList } from "../../../../components/meditate-list";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";
import { Colours } from "../../../../colours";

export type MeditateListScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "list"
>;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colours.dark.$ },
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
  return (
    <>
      <StatusBar style="dark" />

      <MeditateList
        style={styles.container}
        onPress={(id) =>
          navigation.navigate("show", {
            meditationId: id,
          })
        }
      />
    </>
  );
};
