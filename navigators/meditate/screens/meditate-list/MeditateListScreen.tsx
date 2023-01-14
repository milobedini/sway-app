import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Colours } from "../../../../colours";
import { MeditateList } from "../../../../components/meditate-list";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";
import axios from "axios";
import { baseUrl } from "../../../../lib/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type MeditateListScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "list"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
  },
});

export const MeditateListScreen = ({
  navigation,
  route: { params },
}: MeditateListScreenProps): JSX.Element => {
  const [meditation, setMeditation] = useState({ name: "" });

  useEffect(() => {
    const testApi = async () => {
      const response = await axios.get(`${baseUrl}/meditations/9/`);

      console.log(response.data);
      setMeditation(response.data);
    };

    const testStore = async (value: string) => {
      try {
        console.log("Storing test value");
        await AsyncStorage.setItem("testValue", value);
      } catch (err) {
        console.log(err);
      }
    };

    testApi();
    testStore("Ham");
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Text>Meditate List Screen</Text>
      <Text>API Test... {meditation?.name}</Text>
      <MeditateList onPress={() => console.log("Pressed a Meditation")} />
    </>
  );
};
