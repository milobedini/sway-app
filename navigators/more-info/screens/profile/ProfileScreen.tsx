import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { getUsername } from "../../../../lib/auth/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
    color: Colours.lightGrey.$,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ProfileScreen = (): JSX.Element => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const userInfo = async () => {
      try {
        const username = await getUsername();
        if (typeof username === "string") {
          setUsername(username);
        }
      } catch (err) {
        return err;
      }
    };

    userInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={textStyles.title}>{username}</Text>
    </View>
  );
};
