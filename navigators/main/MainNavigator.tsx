import { useWindowDimensions } from "react-native";

import { LargeMainNavigator } from "./LargeMainNavigator";
import { SmallMainNavigator } from "./SmallMainNavigator";

export const MainNavigator = (): JSX.Element => {
  const { width } = useWindowDimensions();

  if (width <= 850) {
    return <SmallMainNavigator />;
  }
  return <LargeMainNavigator />;
};
