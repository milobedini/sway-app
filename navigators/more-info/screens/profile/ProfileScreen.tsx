import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";

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
  const [testValue, setTestValue] = useState("");
  useEffect(() => {
    const getTestData = async () => {
      try {
        // returns data or null
        const value = await AsyncStorage.getItem("testValue");
        if (value !== null) {
          console.log("Test value is ", value);
          setTestValue(value);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTestData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={textStyles.title}>Profile Screen</Text>
      <Text style={textStyles.body}>{testValue}</Text>
    </View>
  );
};
