import { ColorValue, View, ViewProps } from "react-native";

export type HorizontalRuleProps = { color: ColorValue } & ViewProps;

export const HorizontalRule = ({
  style,
  color,
  ...rest
}: HorizontalRuleProps): JSX.Element => (
  <View
    {...rest}
    style={[
      {
        borderBottomColor: color,
        borderBottomWidth: 0.8,
      },
      style,
    ]}
  />
);
