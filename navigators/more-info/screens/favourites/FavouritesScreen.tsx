import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

import { Colours } from "../../../../colours";
import { MoreInfoNavigatorParamsList } from "../../MoreInfoNavigatorParamsList";
import { FavouritesList } from "./components";

export type FavouritesScreenProps = StackScreenProps<
  MoreInfoNavigatorParamsList,
  "favourites"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
  },
});

export const FavouritesScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: FavouritesScreenProps): JSX.Element => (
  <>
    <StatusBar style="light" />
    <View style={styles.container}>
      <FavouritesList
        onPress={(id: number, image: ImageSourcePropType) =>
          navigation.navigate("show", {
            meditationId: id,
            image: image,
          })
        }
      />
    </View>
  </>
);
