import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

import { textStyles } from "../../../../components/text";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export type MeditationSearchScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "search"
>;
export const MeditationSearchScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: MeditationSearchScreenProps) => {
  const [searched, setSearched] = useState(false);
  return (
    <>
      <ReactNativeModal
        isVisible={!searched}
        animationIn={"zoomInUp"}
        animationInTiming={3000}
        animationOut="zoomOutDown"
        animationOutTiming={3000}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={textStyles.title} onPress={() => setSearched(true)}>
            Search Term or Category
            {/* Categories */}
            {/* Search */}
          </Text>
        </View>
      </ReactNativeModal>
      {searched ? (
        <View style={styles.container}>
          <Text style={textStyles.title}>Results</Text>
        </View>
      ) : null}
    </>
  );
};
