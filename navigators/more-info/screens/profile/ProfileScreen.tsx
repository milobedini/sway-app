import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { Fonts } from "../../../../fonts";
import { useAppSelector } from "../../../../lib/redux/hooks";

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

export const ProfileScreen = (): JSX.Element => {
  // @ts-expect-error redux.
  const user = useAppSelector((state) => state.userProfile.profile);

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
