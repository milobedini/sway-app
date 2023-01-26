import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { MeditationListResponseDataItem } from "../../../../../components/meditate-list/mapMeditationTileData";
import { MeditationTileTags } from "../../../../../components/meditation-tile-tags";
import { textStyles } from "../../../../../components/text";
import { useAppSelector } from "../../../../../lib/redux/hooks";
import medTile from "../../../../../components/meditation-tile/MedTile.png";
import { Fonts } from "../../../../../fonts";
import { Colours } from "../../../../../colours";

type MostRecentProps = {
  onPress: () => void;
};
export const MostRecent = ({ onPress }: MostRecentProps): JSX.Element => {
  const { width } = useWindowDimensions();
  const meditations = useAppSelector(
    (state) => state.allMeditations.meditations
  );
  const styles = StyleSheet.create({
    container: { flex: 1, margin: 12, marginTop: 8 },

    list: { borderRadius: 10 },
    listItem: {
      width: (width - 22) / 2,
      height: "100%",
      paddingRight: 10,
      borderRadius: 10,
    },
    image: {
      width: "100%",
      height: "50%",
      resizeMode: "cover",
    },
    title: {
      fontFamily: Fonts.OpenSans_700Bold,
      fontSize: 20,
      color: Colours.bright.$,
      marginBottom: 10,
    },
    topText: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
  });
  return (
    <View style={styles.container}>
      {/* Show 2 meditations at once */}
      {/* <Text>Most Recent horizontal scroll.</Text> */}
      <View style={styles.topText}>
        <Text style={styles.title}>Most Recent</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colours.dark.$,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            borderRadius: 1000,
          }}
          onPress={onPress}
        >
          <Text style={[styles.title, { marginBottom: 0 }]}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meditations}
        keyExtractor={(meditation: MeditationListResponseDataItem, index) =>
          meditation.id ? meditation.id.toString() : index.toString()
        }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={{}}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Image source={medTile} style={styles.image} />
              <Text style={[textStyles.body]} accessibilityRole="header">
                {item.name}
              </Text>

              <MeditationTileTags meditation={item} />
            </View>
          );
        }}
      />
    </View>
  );
};
