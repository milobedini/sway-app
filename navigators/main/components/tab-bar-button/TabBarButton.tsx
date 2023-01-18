import { ComponentType } from "react";
import { StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";

import { Colours } from "../../../../colours";

const styles = StyleSheet.create({
  container: {},
  active: {},
});

export type TabBarButtonProps = {
  icon: ComponentType<SvgProps>;
  focussed: boolean;
  onPress?: () => void;
};

export const TabBarButton = ({
  icon: Icon,
  focussed,
}: TabBarButtonProps): JSX.Element => (
  <View style={[styles.container, focussed && styles.active]}>
    <Icon fill={focussed ? Colours.bright.$ : Colours.lightGrey.$} />
  </View>
);
