import { useWindowDimensions } from "react-native";

import { LargeMainNavigator } from "./LargeMainNavigator";
import { SmallMainNavigator } from "./SmallMainNavigator";

export const MainNavigator = (): JSX.Element => {
  const { width } = useWindowDimensions();

  if (width <= 480) {
    return <SmallMainNavigator />;
  }
  return <LargeMainNavigator />;
};
