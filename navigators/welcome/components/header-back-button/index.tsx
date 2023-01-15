import { HeaderBackButtonProps } from "@react-navigation/elements";
import { StyleSheet } from "react-native";

import { MiniButton } from "../../../../components/mini-button";

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
  },
});
export const HeaderBackButton = (props: HeaderBackButtonProps): JSX.Element => {
  if (!props.canGoBack) return <></>;

  return <MiniButton title="Back" {...props} style={styles.container} />;
};
