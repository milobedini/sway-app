import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export const LinearBackground = (): JSX.Element => (
  <LinearGradient
    colors={["#0b3057", "#051c30"]}
    style={StyleSheet.absoluteFill}
  />
);
