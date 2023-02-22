import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

import { designStyles } from "../../../../components/text";
import { Fonts } from "../../../../fonts";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";
import { Colours } from "../../../../colours";
import { HorizontalRule } from "../../../../components/horizontal-rule";
import { TopSearches } from "./components/TopSearches";
import { SearchResults } from "./components/SearchResults";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 22,
    marginHorizontal: 22,
  },
  resultsContainer: { flex: 1 },
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
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Text
        style={[
          designStyles.subtitle,
          { textAlign: "center", fontFamily: Fonts.OpenSans_700Bold },
        ]}
        onPress={() => {
          setSearched(false);
          setSearched(true);
        }}
      >
        Search
        {/* Categories */}
        {/* Search */}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="search1"
          size={24}
          color={Colours.bright.$}
          style={{ marginRight: 8, paddingTop: 0 }}
        />
        <TextInput
          placeholder="Titles, categories or descriptions"
          onChangeText={(text) => {
            setSearched(false);
            setText(text);
          }}
          style={[
            designStyles.body,
            { marginBottom: 0, alignSelf: "flex-end", lineHeight: 20 },
          ]}
          placeholderTextColor={Colours.darkGrey.$}
          selectionColor="white"
          returnKeyType="search"
          onSubmitEditing={() => setSearched(true)}
        />
      </View>
      <HorizontalRule
        color={"white"}
        style={{
          marginTop: 12,
          marginHorizontal: -22,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: Colours.darkGrey.$,
        }}
      />

      {searched ? (
        <View style={styles.resultsContainer}>
          <SearchResults text={text} searched={searched} />
        </View>
      ) : (
        <TopSearches setText={setText} setSearched={setSearched} />
      )}
    </View>
  );
};
