import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { Fonts } from "../../../../fonts";
import { baseUrl, secureGet } from "../../../../lib/api/api";
import { getUserId } from "../../../../lib/auth/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
    alignItems: "center",
  },
  title: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 42,
    marginBottom: 20,
  },
  stats: {
    flexDirection: "row",
  },
  statContainer: {
    alignItems: "center",
    width: "50%",
  },
  statText: {
    color: Colours.white.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 42,
  },
});

interface User {
  username: string;
  minutes: number;
  sessions: number;
}

export const ProfileScreen = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getProfile = async () => {
      const config = await secureGet(
        `${baseUrl}/auth/profile/${await getUserId()}/`
      );
      try {
        const res = await axios(config);
        setUser(res.data);
      } catch (err) {
        return err;
      }
    };

    getProfile();
  }, []);
  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title]}>{user?.username}</Text>

        <View style={styles.stats}>
          <View style={styles.statContainer}>
            <Text style={[styles.statText]}>{user?.minutes}</Text>
            <Text style={[textStyles.body]}>Mindful Minutes</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={[styles.statText]}>{user?.sessions}</Text>
            <Text style={[textStyles.body]}>Total Sessions</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return <></>;
};
