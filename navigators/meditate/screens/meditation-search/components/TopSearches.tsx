import { ScrollView, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";

import { designStyles } from "../../../../../components/text";
import { topSearchText } from "./topSearchText";
import { Fonts } from "../../../../../fonts";

type TopSearchesProps = {
  setText: Dispatch<SetStateAction<string>>;
};
export const TopSearches = ({ setText }: TopSearchesProps): JSX.Element => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Text
      style={[
        designStyles.subtitle,
        { fontFamily: Fonts.OpenSans_700Bold, fontSize: 20, marginTop: 20 },
      ]}
    >
      Top Searches
    </Text>
    {topSearchText.map((term) => (
      <TouchableOpacity
        key={term}
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 22 }}
        onPress={() => {
          setText(term);
          // Search using term.
        }}
      >
        <AntDesign
          name="search1"
          size={16}
          color={"white"}
          style={{ marginRight: 8, paddingBottom: 12 }}
        />
        <Text style={[designStyles.body, {}]}>{term}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
