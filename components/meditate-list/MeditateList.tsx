import { ScrollViewProps, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

export type MeditateListProps = Omit<ScrollViewProps, "children"> & {
  onPress: (mediitationId: number) => void;
  filterText?: string;
  filterActive?: boolean;
};

const styles = StyleSheet.create({
  meditations: {},
  tile: {},
});

export const MeditateList = ({
  style,
  onPress,
  filterText,
  filterActive = false,
  ...rest
}: MeditateListProps): JSX.Element => (
  <Animated.ScrollView>
    <Text>Meditate List Component</Text>
  </Animated.ScrollView>
);
