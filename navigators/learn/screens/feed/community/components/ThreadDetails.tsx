import { StyleSheet, Text, View } from "react-native";

import { Colours } from "../../../../../../colours";
import { Fonts } from "../../../../../../fonts";
import { timeSince } from "../../../../../../lib/humanisers/date";
import { ThreadDataObject } from "../CommunityShowScreen";
const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontFamily: Fonts.OpenSans_700Bold,
    marginTop: 14,
    marginBottom: 30,
    color: "white",
  },
  paragraph: {
    color: "white",
    marginBottom: 10,
    fontFamily: Fonts.OpenSans_400Regular,
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
});
type ThreadDetailsProps = {
  thread: ThreadDataObject;
};
export const ThreadDetails = ({ thread }: ThreadDetailsProps): JSX.Element => {
  return (
    <>
      <Text style={styles.heading}>{thread.title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.paragraph, { color: Colours.bright.$ }]}>
          {thread.author.username}
        </Text>
        <Text style={[styles.paragraph, { color: Colours.bright.$ }]}>
          {timeSince(new Date(thread.created_at))} ago
        </Text>
      </View>
      <Text style={styles.paragraph}>{thread.text}</Text>
    </>
  );
};
