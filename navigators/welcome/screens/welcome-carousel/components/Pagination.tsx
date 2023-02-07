import { View } from "react-native";

import { PaginationDot } from "./PaginationDot";
import { welcomeConstants, WelcomeDataType } from "./WelcomeConstants";

type PaginationProps = {
  scrollY: { value: number };
  data: WelcomeDataType[];
};
export const Pagination = ({ scrollY, data }: PaginationProps): JSX.Element => (
  <View
    style={{
      position: "absolute",
      left: welcomeConstants.spacing,
    }}
  >
    {data.map((item, index) => {
      return <PaginationDot key={item.key} index={index} scrollY={scrollY} />;
    })}
  </View>
);
