import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import axios from "axios";

import { MeditateList } from "../../../../components/meditate-list";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";
import { baseUrl } from "../../../../lib/api/api";
export type MeditateListScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "list"
>;

export const MeditateListScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: MeditateListScreenProps): JSX.Element => {
  const [meditation, setMeditation] = useState({ name: "" });

  useEffect(() => {
    const testApi = async () => {
      const response = await axios.get(`${baseUrl}/meditations/9/`);
      setMeditation(response.data);
    };

    testApi();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Text>Meditate List Screen</Text>
      <Text>API Test... {meditation?.name}</Text>
      <MeditateList />
    </>
  );
};
